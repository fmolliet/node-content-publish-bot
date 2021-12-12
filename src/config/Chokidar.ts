export default {
    persistent: true,
  
    ignored: '*.text',
    ignoreInitial: true,
    followSymlinks: true,
    cwd: '.',
    disableGlobbing: false,
  
    usePolling: false,
    interval: 100,
    binaryInterval: 300,
    alwaysStat: false,
    depth: 0,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
}