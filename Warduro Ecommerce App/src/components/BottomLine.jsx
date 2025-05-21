import React from 'react';

export default function BottomLine({ text, lineColor = 'var(--bs-themeColor)', TextColor = 'var(--bs-black)', className }) {
  const styles = {
    container: {
      width: 'auto',
      display: 'inline-block',
      position: 'relative',
      textAlign: 'left', // Align text to the left
    },
    text: {
      fontSize: 'auto', // Adjust as needed
      lineHeight: 'auto',
      fontWeight: 'bold',
      margin: '0',
      color: TextColor, // Adjust color as needed
      marginBottom: '3px',
    },
    line: {
      position: 'absolute',
      bottom: '0',
      left: '0', // Align the line to the left
      width: '45%', // Adjust the width of the line
      height: '3px', // Thickness of the line
      borderRadius: '5px',
      backgroundColor: lineColor, // Use the prop for the color
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.text} className={className}>{text}</h1>
      <div style={styles.line}></div>
    </div>
  );
}
