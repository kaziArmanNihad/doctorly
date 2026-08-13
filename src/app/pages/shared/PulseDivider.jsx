const PulseDivider = ({ className = "" }) => (
  <div className={`relative h-10 w-full overflow-hidden ${className}`}>
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <path
        d="M0,20 L340,20 L365,20 L380,4 L400,36 L420,20 L460,20 L900,20 L920,20 L935,4 L955,36 L975,20 L1200,20"
        fill="none"
        stroke="#0F3D3A"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <circle cx="380" cy="4" r="3.5" fill="#E0A94A">
        <animate
          attributeName="cx"
          values="0;1200"
          dur="7s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default PulseDivider;
