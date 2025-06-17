import React from 'react';

const Preloader = () => {
  const styles = {
    overlay: {
      backgroundColor: 'transparent', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    circle: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      border: '2.5px solid #7B61FF', 
      borderTopColor: 'transparent', 
      animation: 'spin 2s linear infinite',
    },
    styleSheet: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
  };

  return (
    <div style={styles.overlay}>
      <style>
        {styles.styleSheet}
      </style>
      
      <div style={styles.circle} />
    </div>
  );
};

export default Preloader;