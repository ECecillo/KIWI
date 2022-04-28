import { BsFillSkipBackwardFill } from 'react-icons/bs';
import { BsFillSkipForwardFill } from 'react-icons/bs';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { IoRepeatOutline } from 'react-icons/io5';
import { IoShuffleOutline } from 'react-icons/io5';
import { MdPlaylistAdd } from 'react-icons/md';
import { FiVolume1 } from 'react-icons/fi';
import { FiVolume2 } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdZoomOutMap } from 'react-icons/md';
import useControls from '../../../hooks/useControls';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';


function MediaPlayer() {
    const {
        states: states,
        handlers: handlers
    } = useControls(null);

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
        loop
    } = states;
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
    } = handlers;

    const [localVolume, setLocalVolume] = useState(0.6);
    /* Executer au démarrage et quand on met à jour le state. */
    useEffect(() => {
        if (localVolume > 0 && localVolume < 1) {
            debouncedAdjustVolume(localVolume);
        }
    }, [localVolume]);

    /* useCallback : Permet de ne pas rafraichir le composant qui utilise le volume à chaque fois que l'on change ce dernier. */
    const debouncedAdjustVolume = useCallback(
        // Comme un useEffect avec un setInterval.
        debounce((volume) => {
            handleVolumeChange(volume);
        }, 300),
        []
    );
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;

    const PlayPauseButton = () => (
        <button onClick={handlePlayPause}>
            {playing ? <MdPauseCircle className='h-12 w-12' /> : <MdPlayCircle className='h-12 w-12' />}
        </button>
    );
    return (
        <div className='bg-white dark:bg-dark-soft-black rounded-3xl absolute bottom-6 w-full px-6 py-4'>
            <div className='flex flex-row w-full items-center mb-3'>
                <span className='w-1/12'></span>
                <span className='hidden md:flex w-3/12 justify-start'>
                    <button className='bg-gray-200 dark:bg-dark-soft-black rounded-md mr-2'>
                        <MdPlaylistAdd className='h-8 w-8' />
                    </button>
                    <button className='bg-gray-200 dark:bg-dark-soft-black rounded-md ml-2'>
                        <MdFavoriteBorder className='h-8 w-8' />
                    </button>
                </span>
                {/* Centre */}
                <span className='flex flex-row w-10/12 md:w-4/12 justify-around'>
                    <button>
                        <IoShuffleOutline className='h-6 w-6' />
                    </button>
                    <button>
                        <BsFillSkipBackwardFill className='h-6 w-6' />
                    </button>
                    <PlayPauseButton />
                    <button>
                        <BsFillSkipForwardFill className='h-6 w-6' />
                    </button>
                    <button>
                        <IoRepeatOutline className='h-6 w-6' color='white' />
                    </button>
                </span>
                {/* Volume */}
                <span className='hidden md:flex flex-row w-0 md:w-3/12 justify-end items-center px-10'>
                    <FiVolume1 className='h-5 w-5' />
                    <input className='mx-2' type='range' min={0} max={1} step='any' value={localVolume} onChange={e => setLocalVolume(parseFloat(e.target.value))} />
                    <FiVolume2 className='h-6 w-6' />
                </span>
                <span className='w-1/12 flex items-center justify-end'>
                    <button className='md:hidden rounded-md mr-2'>
                        <MdZoomOutMap className='h-5 w-5' />
                    </button>
                </span>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <p>0:43</p>
                <input className='w-10/12 mx-3'
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp} />
                <p>{minutes}:{seconds}</p>
            </div>
        </div>
    )
}

export default MediaPlayer