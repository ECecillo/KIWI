import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { HelloWorld } from '../../mediaPlayer/Controls'
import Control from '../../mediaPlayer/Controls'
import useControls from '../../../../hooks/useControls'

function Video() {
  const player = useRef(null) // Récupèrera le composant DOM pour que l'on puisse appeler des fonctions sur cette éléments.
  const { states: states, handlers: handlers } = useControls(player) // Passe la référence du DOM au hooks.

  const {
    url,
    playing,
    played,
    pip,
    volume,
    muted,
    seeking,
    loaded,
    playedSeconds,
    loadedSeconds,
    duration,
    loop,
  } = states
  const {
    handlePlayPause,
    handlePlay,
    handlePause,
    handleStop,
    handleToggleLoop,
    handleVolumeChange,
    handleToggleMuted,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handleProgress,
    handleEnded,
    handleDuration,
  } = handlers
  useEffect(() => {
    console.log(player.current)
  }, [player])

  return (
    <div className="flex rounded-lg">
      <ReactPlayer
        ref={player}
        url={
          'https://www.youtube.com/watch?v=SjBVLIHXQ14&list=RDSjBVLIHXQ14&start_radio=1'
        }
        width={'100%'}
        pip={pip}
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={() => console.log('onBuffer')}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={(e) => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </div>
  )
}

export default Video
