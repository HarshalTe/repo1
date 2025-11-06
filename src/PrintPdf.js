


import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import LibraValuersStandardApfReport from './LibraValuersStandardApfReport';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = A4_WIDTH_MM * 3.7795275591;
const A4_HEIGHT_PX = A4_HEIGHT_MM * 3.7795275591;
const MARGIN_MM = 10;

const PrintPdf = () => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([
    { id: 1, position: 100, label: 'Start Measurement Line 1' },
    { id: 2, position: 200, label: 'End Measurement Line 1' },
  ]);
  const [showEditMode, setShowEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isCloseToOtherLine = (currentLine, otherLines, threshold = 30) => {
    return otherLines.some(line => 
      line.id !== currentLine.id && Math.abs(line.position - currentLine.position) < threshold
    );
  };

  const draggingLine = useRef(null);
  const [pageBreaks, setPageBreaks] = useState([]);

  const updatePageBreaks = () => {
    const container = containerRef.current;
    if (container) {
      const containerHeight = container.offsetHeight;
      const totalPages = Math.ceil(containerHeight / A4_HEIGHT_PX);

      const breaks = [];
      for (let i = 1; i < totalPages; i++) {
        breaks.push(i * A4_HEIGHT_PX);
      }
      setPageBreaks(breaks);
    }
  };

  useEffect(() => {
    updatePageBreaks();
  }, [lines]);

  const handleDragStart = (id) => {
    draggingLine.current = id;
    document.body.style.userSelect = 'none';
  };

  const handleDrag = (event) => {
    if (!draggingLine.current) return;

    const container = containerRef.current;
    if (!container) return;

    const containerHeight = container.offsetHeight;
    const mouseY = event.clientY - container.getBoundingClientRect().top;

    setLines((prevLines) => {
      return prevLines.map((line) => {
        if (line.id === draggingLine.current) {
          const isStartLine = line.id % 2 === 1;
          const lineIndex = prevLines.findIndex((l) => l.id === line.id);

          const previousLine = lineIndex > 0 ? prevLines[lineIndex - 1] : null;
          const nextLine = lineIndex < prevLines.length - 1 ? prevLines[lineIndex + 1] : null;

          const correspondingStartLine = !isStartLine && lineIndex > 0 ? prevLines[lineIndex - 1] : null;
          const correspondingEndLine = isStartLine && lineIndex < prevLines.length - 1 ? prevLines[lineIndex + 1] : null;

          // Clamp the new position to stay within container bounds
          let newPosition = Math.max(0, Math.min(mouseY, containerHeight));

          if (previousLine) {
            newPosition = Math.max(newPosition, previousLine.position);
          }

          if (nextLine) {
            newPosition = Math.min(newPosition, nextLine.position);
          }

          if (correspondingStartLine && !isStartLine) {
            newPosition = Math.max(newPosition, correspondingStartLine.position);
          }

          if (correspondingEndLine && isStartLine) {
            newPosition = Math.min(newPosition, correspondingEndLine.position);
          }

          return { ...line, position: newPosition };
        }
        return line;
      });
    });
  };

  const handleDragEnd = () => {
    draggingLine.current = null;
    document.body.style.userSelect = 'auto';
    updatePageBreaks();
  };

  const handleDoubleClick = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const containerHeight = container.offsetHeight;
    const mouseY = event.clientY - container.getBoundingClientRect().top;

    // Clamp mouseY to container bounds
    const clampedMouseY = Math.max(0, Math.min(mouseY, containerHeight));

    const closestLine = lines.reduce((closest, line) => 
      Math.abs(line.position - clampedMouseY) < Math.abs(closest.position - clampedMouseY) ? line : closest
    );

    setLines(prevLines => prevLines.map(line => 
      line.id === closestLine.id ? { ...line, position: clampedMouseY } : line
    ));
  };

  const calculateHeightLabel = (startPosition, endPosition) => {
    const heightPx = endPosition - startPosition;
    const pageCount = (heightPx / A4_HEIGHT_PX).toFixed(2);
    const isExceedingA4 = heightPx > A4_HEIGHT_PX;
    return {
      heightPx,
      pageCount,
      color: isExceedingA4 ? 'red' : 'green',
    };
  };

  const handleGenerateAndSave = async (isFullDocument = false) => {
    if (!containerRef.current) return;

    setIsLoading(true);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    try {
      if (isFullDocument) {
        const containerHeight = containerRef.current.offsetHeight;
        const totalPages = Math.ceil(containerHeight / A4_HEIGHT_PX);

        for (let page = 0; page < totalPages; page++) {
          const tempWrapper = document.createElement('div');
          tempWrapper.style.position = 'relative';
          tempWrapper.style.width = `${A4_WIDTH_PX}px`;
          tempWrapper.style.height = `${A4_HEIGHT_PX}px`;
          tempWrapper.style.overflow = 'hidden';
          tempWrapper.style.backgroundColor = '#fff';

          const clonedContent = containerRef.current.cloneNode(true);
          clonedContent.style.transform = `translateY(-${page * A4_HEIGHT_PX}px)`;

          const linesToRemove = clonedContent.querySelectorAll('.draggable-line');
          linesToRemove.forEach(line => line.remove());

          const pageBreaksToRemove = clonedContent.querySelectorAll('.page-break-line');
          pageBreaksToRemove.forEach(breakLine => breakLine.remove());

          tempWrapper.appendChild(clonedContent);
          document.body.appendChild(tempWrapper);

          const dataUrl = await toPng(tempWrapper, {
            quality: 1,
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
          });

          document.body.removeChild(tempWrapper);

          const imgProps = pdf.getImageProperties(dataUrl);
          const imgWidth = A4_WIDTH_MM - 2 * MARGIN_MM;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          if (page > 0) {
            pdf.addPage();
          }

          pdf.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
          pdf.setDrawColor(0, 0, 0);
          pdf.setLineWidth(0.25);
          pdf.rect(MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
        }
      } else {
        const sortedLines = [...lines].sort((a, b) => a.position - b.position);
        const linePairs = [];
        for (let i = 0; i < sortedLines.length - 1; i += 2) {
          linePairs.push([sortedLines[i], sortedLines[i + 1]]);
        }

        for (let i = 0; i < linePairs.length; i++) {
          const [startLine, endLine] = linePairs[i];
          const topLine = startLine.position;
          const bottomLine = endLine.position;
          const printHeight = bottomLine - topLine;

          const tempWrapper = document.createElement('div');
          tempWrapper.style.position = 'relative';
          tempWrapper.style.width = `${A4_WIDTH_PX}px`;
          tempWrapper.style.height = `${printHeight}px`;
          tempWrapper.style.overflow = 'hidden';
          tempWrapper.style.backgroundColor = '#fff';

          const clonedContent = containerRef.current.cloneNode(true);
          clonedContent.style.transform = `translateY(-${topLine}px)`;

          const linesToRemove = clonedContent.querySelectorAll('.draggable-line');
          linesToRemove.forEach(line => line.remove());

          const pageBreaksToRemove = clonedContent.querySelectorAll('.page-break-line');
          pageBreaksToRemove.forEach(breakLine => breakLine.remove());

          tempWrapper.appendChild(clonedContent);
          document.body.appendChild(tempWrapper);

          const dataUrl = await toPng(tempWrapper, {
            quality: 1,
            width: A4_WIDTH_PX,
            height: printHeight,
          });

          document.body.removeChild(tempWrapper);

          const imgProps = pdf.getImageProperties(dataUrl);
          const imgWidth = A4_WIDTH_MM - 2 * MARGIN_MM;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
          pdf.setDrawColor(0, 0, 0);
          pdf.setLineWidth(0.25);
          pdf.rect(MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
        }
      }

      pdf.save(isFullDocument ? 'full_document.pdf' : 'sections.pdf');

      const pdfBlob = pdf.output('blob');
      const formData = new FormData();
      formData.append('document_file', pdfBlob, isFullDocument ? 'full_document.pdf' : 'sections.pdf');

      const response = await fetch('https://libravaluer.com/librabackend/public/api/propertyDocs', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 247|fQy2O53TbPgZPFSBqVlJmjY50037EPLCh40M7EyX',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      alert('PDF successfully saved to the backend!');
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addMeasurementLines = () => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.offsetHeight;
    const currentMeasurementCount = Math.floor(lines.length / 2);

    const lastEndLine = lines.filter(line => line.id % 2 === 0).pop();
    const newStartLinePosition = lastEndLine ? lastEndLine.position + 50 : containerHeight - 150; // Adjusted to ensure it fits
    const newEndLinePosition = newStartLinePosition + 100;

    const newStartLineId = lines.length + 1;
    const newEndLineId = lines.length + 2;

    setLines((prevLines) => [
      ...prevLines,
      {
        id: newStartLineId,
        position: Math.max(0, Math.min(newStartLinePosition, containerHeight - 100)), // Ensure within bounds
        label: `Start Measurement Line ${currentMeasurementCount + 1}`,
      },
      {
        id: newEndLineId,
        position: Math.max(0, Math.min(newEndLinePosition, containerHeight - 10)), // Ensure within bounds
        label: `End Measurement Line ${currentMeasurementCount + 1}`,
      },
    ]);
    updatePageBreaks();
  };

  const deleteMeasurementLines = () => {
    if (lines.length > 2) {
      setLines((prevLines) => prevLines.slice(0, -2));
      updatePageBreaks();
    }
  };

  const toggleEditMode = () => {
    setShowEditMode(!showEditMode);
  };

  return (
    <div
      style={{ padding: '20px', position: 'relative', userSelect: 'none' }}
      onMouseMove={showEditMode ? handleDrag : undefined}
      onMouseUp={showEditMode ? handleDragEnd : undefined}
      onDoubleClick={showEditMode ? handleDoubleClick : undefined}
    >
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            />
            <span>Generating PDF...</span>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: `${A4_WIDTH_PX}px`,
          minHeight: `${A4_HEIGHT_PX}px`,
          background: '#fff',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        <LibraValuersStandardApfReport />
        {showEditMode && lines.map((line, index) => {
          const isClose = isCloseToOtherLine(line, lines);
          const isStartLine = line.id % 2 === 1;

          return (
            <div key={line.id}>
              <div
                className="draggable-line"
                style={{
                  position: 'absolute',
                  top: `${line.position}px`,
                  left: '0',
                  width: '100%',
                  borderTop: '2px dashed green',
                  textAlign: 'center',
                  cursor: 'grab',
                }}
                onMouseDown={() => handleDragStart(line.id)}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'yellow',
                    padding: '0 5px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    top: isClose ? (isStartLine ? '5px' : '-25px') : '-20px',
                  }}
                >
                  {line.label}
                </span>
                {lines.length > 1 && line.id % 2 === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      backgroundColor: '#fff',
                      padding: '0 5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: calculateHeightLabel(lines[line.id - 2].position, line.position).color,
                      top: isClose ? '-25px' : '-20px',
                    }}
                  >
                    {`Height: ${calculateHeightLabel(lines[line.id - 2].position, line.position).heightPx}px | ${calculateHeightLabel(
                      lines[line.id - 2].position,
                      line.position
                    ).pageCount} A4`}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {showEditMode && (
          <div style={{ position: 'absolute', top: `${lines.length > 0 ? lines[lines.length - 1].position + 20 : 20}px`, left: '800px', display: 'flex', gap: '10px' }}>
            <button
              onClick={addMeasurementLines}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 1,
                transition: 'background-color 0.3s, transform 0.3s',
              }}
            >
              ADD
            </button>
            <button
              onClick={deleteMeasurementLines}
              style={{
                backgroundColor: '#F44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
                zIndex: 1,
                transition: 'background-color 0.3s, transform 0.3s',
              }}
            >
              DELETE
            </button>
          </div>
        )}

        {showEditMode && pageBreaks.map((breakPosition, index) => (
          <div
            key={index}
            className="page-break-line"
            style={{
              position: 'absolute',
              top: `${breakPosition}px`,
              left: '0',
              width: '100%',
              borderTop: '1px dashed red',
              textAlign: 'center',
              cursor: 'default',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'red',
                padding: '0 5px',
                fontSize: '12px',
                fontWeight: 'bold',
                top: '-20px',
              }}
            >
              Page Break {index + 1}
            </span>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={toggleEditMode}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = '#1976D2';
            e.target.style.transform = 'translateY(2px)';
          }}
        >
          {showEditMode ? 'Hide Edit Mode' : 'Edit'}
        </button>
        {showEditMode && (
          <button
            onClick={() => handleGenerateAndSave(false)}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#2196F3';
              e.target.style.transform = 'translateY(2px)';
            }}
            disabled={isLoading}
          >
            Capture Screenshot
          </button>
        )}
        <button
          onClick={() => handleGenerateAndSave(true)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = '#2196F3';
            e.target.style.transform = 'translateY(2px)';
          }}
          disabled={isLoading}
        >
          Print All
        </button>
      </div>
    </div>
  );
};

export default PrintPdf;





// import React, { useState, useRef, useEffect } from 'react';
// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';
// import LibraValuersStandardApfReport from './LibraValuersStandardApfReport';

// const A4_WIDTH_MM = 210;
// const A4_HEIGHT_MM = 297;
// const A4_WIDTH_PX = A4_WIDTH_MM * 3.7795275591;
// const A4_HEIGHT_PX = A4_HEIGHT_MM * 3.7795275591;
// const MARGIN_MM = 10;

// const PrintPdf = () => {
//   const containerRef = useRef(null);
//   const [lines, setLines] = useState([
//     { id: 1, position: 100, label: 'Start Measurement Line 1' },
//     { id: 2, position: 200, label: 'End Measurement Line 1' },
//   ]);
//   const [showEditMode, setShowEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const isCloseToOtherLine = (currentLine, otherLines, threshold = 30) => {
//     return otherLines.some(line => 
//       line.id !== currentLine.id && Math.abs(line.position - currentLine.position) < threshold
//     );
//   };

//   const draggingLine = useRef(null);
//   const [pageBreaks, setPageBreaks] = useState([]);

//   const updatePageBreaks = () => {
//     const container = containerRef.current;
//     if (container) {
//       const containerHeight = container.offsetHeight;
//       const totalPages = Math.ceil(containerHeight / A4_HEIGHT_PX);

//       const breaks = [];
//       for (let i = 1; i < totalPages; i++) {
//         breaks.push(i * A4_HEIGHT_PX);
//       }
//       setPageBreaks(breaks);
//     }
//   };

//   useEffect(() => {
//     updatePageBreaks();
//   }, [lines]);

//   const handleDragStart = (id) => {
//     draggingLine.current = id;
//     document.body.style.userSelect = 'none';
//   };

//   const handleDrag = (event) => {
//     if (!draggingLine.current) return;
  
//     const mouseY = event.clientY - containerRef.current.getBoundingClientRect().top;
  
//     setLines((prevLines) => {
//       return prevLines.map((line) => {
//         if (line.id === draggingLine.current) {
//           const isStartLine = line.id % 2 === 1;
//           const lineIndex = prevLines.findIndex((l) => l.id === line.id);
  
//           const previousLine = lineIndex > 0 ? prevLines[lineIndex - 1] : null;
//           const nextLine = lineIndex < prevLines.length - 1 ? prevLines[lineIndex + 1] : null;
  
//           const correspondingStartLine = !isStartLine && lineIndex > 0 ? prevLines[lineIndex - 1] : null;
//           const correspondingEndLine = isStartLine && lineIndex < prevLines.length - 1 ? prevLines[lineIndex + 1] : null;
  
//           let newPosition = mouseY;
  
//           if (previousLine) {
//             newPosition = Math.max(newPosition, previousLine.position);
//           }
  
//           if (nextLine) {
//             newPosition = Math.min(newPosition, nextLine.position);
//           }
  
//           if (correspondingStartLine && !isStartLine) {
//             newPosition = Math.max(newPosition, correspondingStartLine.position);
//           }
  
//           if (correspondingEndLine && isStartLine) {
//             newPosition = Math.min(newPosition, correspondingEndLine.position);
//           }
  
//           return { ...line, position: newPosition };
//         }
//         return line;
//       });
//     });
//   };
  
//   const handleDragEnd = () => {
//     draggingLine.current = null;
//     document.body.style.userSelect = 'auto';
//     updatePageBreaks();
//   };

//   const handleDoubleClick = (event) => {
//     const mouseY = event.clientY - containerRef.current.getBoundingClientRect().top;
    
//     const closestLine = lines.reduce((closest, line) => 
//       Math.abs(line.position - mouseY) < Math.abs(closest.position - mouseY) ? line : closest
//     );
  
//     setLines(prevLines => prevLines.map(line => 
//       line.id === closestLine.id ? { ...line, position: mouseY } : line
//     ));
//   };

//   const calculateHeightLabel = (startPosition, endPosition) => {
//     const heightPx = endPosition - startPosition;
//     const pageCount = (heightPx / A4_HEIGHT_PX).toFixed(2);
//     const isExceedingA4 = heightPx > A4_HEIGHT_PX;
//     return {
//       heightPx,
//       pageCount,
//       color: isExceedingA4 ? 'red' : 'green',
//     };
//   };

//   const handleGenerateAndSave = async (isFullDocument = false) => {
//     if (!containerRef.current) return;

//     setIsLoading(true);

//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4',
//       compress: true,
//     });

//     try {
//       if (isFullDocument) {
//         const containerHeight = containerRef.current.offsetHeight;
//         const totalPages = Math.ceil(containerHeight / A4_HEIGHT_PX);

//         for (let page = 0; page < totalPages; page++) {
//           const tempWrapper = document.createElement('div');
//           tempWrapper.style.position = 'relative';
//           tempWrapper.style.width = `${A4_WIDTH_PX}px`;
//           tempWrapper.style.height = `${A4_HEIGHT_PX}px`;
//           tempWrapper.style.overflow = 'hidden';
//           tempWrapper.style.backgroundColor = '#fff';

//           const clonedContent = containerRef.current.cloneNode(true);
//           clonedContent.style.transform = `translateY(-${page * A4_HEIGHT_PX}px)`;

//           const linesToRemove = clonedContent.querySelectorAll('.draggable-line');
//           linesToRemove.forEach(line => line.remove());

//           const pageBreaksToRemove = clonedContent.querySelectorAll('.page-break-line');
//           pageBreaksToRemove.forEach(breakLine => breakLine.remove());

//           tempWrapper.appendChild(clonedContent);
//           document.body.appendChild(tempWrapper);

//           const dataUrl = await toPng(tempWrapper, {
//             quality: 1,
//             width: A4_WIDTH_PX,
//             height: A4_HEIGHT_PX,
//           });

//           document.body.removeChild(tempWrapper);

//           const imgProps = pdf.getImageProperties(dataUrl);
//           const imgWidth = A4_WIDTH_MM - 2 * MARGIN_MM;
//           const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//           if (page > 0) {
//             pdf.addPage();
//           }

//           pdf.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
//           pdf.setDrawColor(0, 0, 0);
//           pdf.setLineWidth(0.25);
//           pdf.rect(MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
//         }
//       } else {
//         const sortedLines = [...lines].sort((a, b) => a.position - b.position);
//         const linePairs = [];
//         for (let i = 0; i < sortedLines.length - 1; i += 2) {
//           linePairs.push([sortedLines[i], sortedLines[i + 1]]);
//         }

//         for (let i = 0; i < linePairs.length; i++) {
//           const [startLine, endLine] = linePairs[i];
//           const topLine = startLine.position;
//           const bottomLine = endLine.position;
//           const printHeight = bottomLine - topLine;

//           const tempWrapper = document.createElement('div');
//           tempWrapper.style.position = 'relative';
//           tempWrapper.style.width = `${A4_WIDTH_PX}px`;
//           tempWrapper.style.height = `${printHeight}px`;
//           tempWrapper.style.overflow = 'hidden';
//           tempWrapper.style.backgroundColor = '#fff';

//           const clonedContent = containerRef.current.cloneNode(true);
//           clonedContent.style.transform = `translateY(-${topLine}px)`;

//           const linesToRemove = clonedContent.querySelectorAll('.draggable-line');
//           linesToRemove.forEach(line => line.remove());

//           const pageBreaksToRemove = clonedContent.querySelectorAll('.page-break-line');
//           pageBreaksToRemove.forEach(breakLine => breakLine.remove());

//           tempWrapper.appendChild(clonedContent);
//           document.body.appendChild(tempWrapper);

//           const dataUrl = await toPng(tempWrapper, {
//             quality: 1,
//             width: A4_WIDTH_PX,
//             height: printHeight,
//           });

//           document.body.removeChild(tempWrapper);

//           const imgProps = pdf.getImageProperties(dataUrl);
//           const imgWidth = A4_WIDTH_MM - 2 * MARGIN_MM;
//           const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//           if (i > 0) {
//             pdf.addPage();
//           }

//           pdf.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
//           pdf.setDrawColor(0, 0, 0);
//           pdf.setLineWidth(0.25);
//           pdf.rect(MARGIN_MM, MARGIN_MM, imgWidth, imgHeight);
//         }
//       }

//       pdf.save(isFullDocument ? 'full_document.pdf' : 'sections.pdf');

//       const pdfBlob = pdf.output('blob');
//       const formData = new FormData();
//       formData.append('document_file', pdfBlob, isFullDocument ? 'full_document.pdf' : 'sections.pdf');

//       const response = await fetch('https://libravaluer.com/librabackend/public/api/propertyDocs', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer 247|fQy2O53TbPgZPFSBqVlJmjY50037EPLCh40M7EyX',
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload PDF');
//       }

//       alert('PDF successfully saved to the backend!');
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//       alert('Error processing PDF. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addMeasurementLines = () => {
//     if (!containerRef.current) return;

//     const containerHeight = containerRef.current.offsetHeight;
//     const currentMeasurementCount = Math.floor(lines.length / 2);

//     const lastEndLine = lines.filter(line => line.id % 2 === 0).pop();
//     const newStartLinePosition = lastEndLine ? lastEndLine.position + 50 : containerHeight - 50;
//     const newEndLinePosition = newStartLinePosition + 100;

//     const newStartLineId = lines.length + 1;
//     const newEndLineId = lines.length + 2;

//     setLines((prevLines) => [
//       ...prevLines,
//       {
//         id: newStartLineId,
//         position: Math.min(newStartLinePosition, containerHeight - 10),
//         label: `Start Measurement Line ${currentMeasurementCount + 1}`,
//       },
//       {
//         id: newEndLineId,
//         position: Math.min(newEndLinePosition, containerHeight - 10),
//         label: `End Measurement Line ${currentMeasurementCount + 1}`,
//       },
//     ]);
//     updatePageBreaks();
//   };

//   const deleteMeasurementLines = () => {
//     if (lines.length > 2) {
//       setLines((prevLines) => prevLines.slice(0, -2));
//       updatePageBreaks();
//     }
//   };

//   const toggleEditMode = () => {
//     setShowEditMode(!showEditMode);
//   };

//   return (
//     <div
//       style={{ padding: '20px', position: 'relative', userSelect: 'none' }}
//       onMouseMove={showEditMode ? handleDrag : undefined}
//       onMouseUp={showEditMode ? handleDragEnd : undefined}
//       onDoubleClick={showEditMode ? handleDoubleClick : undefined}
//     >
//       {isLoading && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '5px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: '10px',
//             }}
//           >
//             <div
//               style={{
//                 border: '4px solid #f3f3f3',
//                 borderTop: '4px solid #3498db',
//                 borderRadius: '50%',
//                 width: '40px',
//                 height: '40px',
//                 animation: 'spin 1s linear infinite',
//               }}
//             />
//             <span>Generating PDF...</span>
//             <style>
//               {`
//                 @keyframes spin {
//                   0% { transform: rotate(0deg); }
//                   100% { transform: rotate(360deg); }
//                 }
//               `}
//             </style>
//           </div>
//         </div>
//       )}
//       <div
//         ref={containerRef}
//         style={{
//           width: `${A4_WIDTH_PX}px`,
//           minHeight: `${A4_HEIGHT_PX}px`,
//           background: '#fff',
//           border: '1px solid black',
//           position: 'relative',
//         }}
//       >
//         <LibraValuersStandardApfReport />
//         {showEditMode && lines.map((line, index) => {
//           const isClose = isCloseToOtherLine(line, lines);
//           const isStartLine = line.id % 2 === 1;
          
//           return (
//             <div key={line.id}>
//               <div
//                 className="draggable-line"
//                 style={{
//                   position: 'absolute',
//                   top: `${line.position}px`,
//                   left: '0',
//                   width: '100%',
//                   borderTop: '2px dashed green',
//                   textAlign: 'center',
//                   cursor: 'grab',
//                 }}
//                 onMouseDown={() => handleDragStart(line.id)}
//               >
//                 <span
//                   style={{
//                     position: 'absolute',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     backgroundColor: 'yellow',
//                     padding: '0 5px',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                     top: isClose ? (isStartLine ? '5px' : '-25px') : '-20px',
//                   }}
//                 >
//                   {line.label}
//                 </span>
//                 {lines.length > 1 && line.id % 2 === 0 && (
//                   <span
//                     style={{
//                       position: 'absolute',
//                       right: '10px',
//                       backgroundColor: '#fff',
//                       padding: '0 5px',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                       color: calculateHeightLabel(lines[line.id - 2].position, line.position).color,
//                       top: isClose ? '-25px' : '-20px',
//                     }}
//                   >
//                     {`Height: ${calculateHeightLabel(lines[line.id - 2].position, line.position).heightPx}px | ${calculateHeightLabel(
//                       lines[line.id - 2].position,
//                       line.position
//                     ).pageCount} A4`}
//                   </span>
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         {showEditMode && (
//           <div style={{ position: 'absolute', top: `${lines.length > 0 ? lines[lines.length - 1].position + 20 : 20}px`, left: '800px', display: 'flex', gap: '10px' }}>
//             <button
//               onClick={addMeasurementLines}
//               style={{
//                 backgroundColor: '#2196F3',
//                 color: 'white',
//                 padding: '10px 20px',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 zIndex: 1,
//                 transition: 'background-color 0.3s, transform 0.3s',
//               }}
//             >
//               ADD
//             </button>
//             <button
//               onClick={deleteMeasurementLines}
//               style={{
//                 backgroundColor: '#F44336',
//                 color: 'white',
//                 padding: '10px 20px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 borderRadius: '5px',
//                 zIndex: 1,
//                 transition: 'background-color 0.3s, transform 0.3s',
//               }}
//             >
//               DELETE
//             </button>
//           </div>
//         )}

//         {showEditMode && pageBreaks.map((breakPosition, index) => (
//           <div
//             key={index}
//             className="page-break-line"
//             style={{
//               position: 'absolute',
//               top: `${breakPosition}px`,
//               left: '0',
//               width: '100%',
//               borderTop: '1px dashed red',
//               textAlign: 'center',
//               cursor: 'default',
//             }}
//           >
//             <span
//               style={{
//                 position: 'absolute',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 color: 'red',
//                 padding: '0 5px',
//                 fontSize: '12px',
//                 fontWeight: 'bold',
//                 top: '-20px',
//               }}
//             >
//               Page Break {index + 1}
//             </span>
//           </div>
//         ))}
//       </div>
//       <br />
//       <br />
//       <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
//         <button
//           onClick={toggleEditMode}
//           style={{
//             backgroundColor: '#2196F3',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             cursor: 'pointer',
//             borderRadius: '5px',
//             transition: 'background-color 0.3s, transform 0.3s',
//           }}
//           onFocus={(e) => {
//             e.target.style.backgroundColor = '#1976D2';
//             e.target.style.transform = 'translateY(2px)';
//           }}
//         >
//           {showEditMode ? 'Hide Edit Mode' : 'Edit'}
//         </button>
//         {showEditMode && (
//           <button
//             onClick={() => handleGenerateAndSave(false)}
//             style={{
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               padding: '10px 20px',
//               border: 'none',
//               cursor: 'pointer',
//               borderRadius: '5px',
//               transition: 'background-color 0.3s, transform 0.3s',
//             }}
//             onFocus={(e) => {
//               e.target.style.backgroundColor = '#2196F3';
//               e.target.style.transform = 'translateY(2px)';
//             }}
//             disabled={isLoading}
//           >
//             Capture Screenshot
//           </button>
//         )}
//         <button
//           onClick={() => handleGenerateAndSave(true)}
//           style={{
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             cursor: 'pointer',
//             borderRadius: '5px',
//             transition: 'background-color 0.3s, transform 0.3s',
//           }}
//           onFocus={(e) => {
//             e.target.style.backgroundColor = '#2196F3';
//             e.target.style.transform = 'translateY(2px)';
//           }}
//           disabled={isLoading}
//         >
//           Print All
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PrintPdf;

















