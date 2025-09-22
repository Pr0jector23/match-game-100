
const Win = () => {

    return (
        <div className = "win-container">
            <div className='win-white'>
                <h1>VICTORY!</h1>
                <h3>The password is pinapple</h3>
                <button onClick={() =>window.location.reload()} className='restart-button'>
                    play again
                </button>
            </div>
        </div>
    )
}

export default Win