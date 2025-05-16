.snowfall-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.clouds-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%);
  z-index: 0;
}

/* Blob styles */
.blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(128px);
  opacity: 0.7;
}

/* Snowflake styles */
.snowflake {
  position: absolute;
  color: white;
  user-select: none;
  pointer-events: none;
}
