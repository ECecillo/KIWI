import { BsFillSkipBackwardFill } from 'react-icons/bs'
import { BsFillSkipForwardFill } from 'react-icons/bs'
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md'
import { IoRepeatOutline } from 'react-icons/io5'
import { IoShuffleOutline } from 'react-icons/io5'
import { MdPlaylistAdd } from 'react-icons/md'
import { FiVolume1 } from 'react-icons/fi'
import { FiVolume2 } from 'react-icons/fi'
import { MdFavoriteBorder } from 'react-icons/md'
import { MdZoomOutMap } from 'react-icons/md'
import useControls from '../../../hooks/useControls'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { durationCurrentSong } from '../../../atoms/songAtom'

function getDuration(minutes, secondes) {
  let result = ''
  if (minutes < 10) {
    result += '0' + minutes + ':'
  } else if (minutes >= 10) {
    result += minutes + ':'
  }
  if (secondes < 10) {
    result += '0' + secondes
  } else if (secondes >= 10) {
    result += secondes
  }
  return result
}

function getTimePlayed(duration) {
  let minutes = Math.round(duration / 60)
  let secondes = Math.round(duration % 60)
  let result = getDuration(minutes, secondes)
  return result
}

function MediaPlayer() {
  const { states: states, handlers: handlers } = useControls(null)

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

  const [localVolume, setLocalVolume] = useState(0.6)
  /* Executer au démarrage et quand on met à jour le state. */
  useEffect(() => {
    if (localVolume > 0 && localVolume < 1) {
      debouncedAdjustVolume(localVolume)
    }
  }, [localVolume])

  /* useCallback : Permet de ne pas rafraichir le composant qui utilise le volume à chaque fois que l'on change ce dernier. */
  const debouncedAdjustVolume = useCallback(
    // Comme un useEffect avec un setInterval.
    debounce((volume) => {
      handleVolumeChange(volume)
    }, 300),
    []
  )
  let minutes = Math.floor(duration / 60)
  let seconds = duration - minutes * 60

  const PlayPauseButton = () => (
    <button onClick={handlePlayPause}>
      {playing ? (
        <MdPauseCircle className="h-12 w-12" />
      ) : (
        <MdPlayCircle className="h-12 w-12" />
      )}
    </button>
  )
  return (
    <div className="absolute bottom-6 w-full rounded-3xl bg-white px-6 py-4 dark:bg-dark-soft-black">
      <div className="mb-3 flex w-full flex-row items-center">
        <span className="w-1/12"></span>
        <span className="hidden w-3/12 justify-start md:flex">
          <button className="mr-2 rounded-md bg-gray-200 dark:bg-dark-soft-black">
            <MdPlaylistAdd className="h-8 w-8" />
          </button>
          <button className="ml-2 rounded-md bg-gray-200 dark:bg-dark-soft-black">
            <MdFavoriteBorder className="h-8 w-8" />
          </button>
        </span>
        {/* Centre */}
        <span className="flex w-10/12 flex-row justify-around md:w-4/12">
          <button>
            <IoShuffleOutline className="h-6 w-6" />
          </button>
          <button>
            <BsFillSkipBackwardFill className="h-6 w-6" />
          </button>
          <PlayPauseButton />
          <button>
            <BsFillSkipForwardFill className="h-6 w-6" />
          </button>
          <button>
            <IoRepeatOutline className="h-6 w-6" color="white" />
          </button>
        </span>
        {/* Volume */}
        <span className="hidden w-0 flex-row items-center justify-end px-10 md:flex md:w-3/12">
          <FiVolume1 className="h-5 w-5" />
          <input
            className="mx-2"
            type="range"
            min={0}
            max={1}
            step="any"
            value={localVolume}
            onChange={(e) => setLocalVolume(parseFloat(e.target.value))}
          />
          <FiVolume2 className="h-6 w-6" />
        </span>
        <span className="flex w-1/12 items-center justify-end">
          <button className="mr-2 rounded-md md:hidden">
            <MdZoomOutMap className="h-5 w-5" />
          </button>
        </span>
      </div>
      <div className="flex flex-row items-center justify-center">
        <p>{getTimePlayed(played * duration)}</p>
        <input
          className="mx-3 w-10/12"
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <p>{getDuration(minutes, seconds)}</p>
      </div>
    </div>
  )
}

export default MediaPlayer
