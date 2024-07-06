
import './main-page-show-logic-work.css';
import { useNavigate } from 'react-router-dom';

function MainPageShowLogic() {
    const navigate = useNavigate();

    const navigateTo = (path) => {
      navigate(path);
    };
    return (
        
        <div className='container'>
            <div className='just-flex-yo'>
                <div className='text-greeting'>
                    MY WORK
                </div>
                <div className='work-cards'>
                    <div className='work-card' onClick={() => navigateTo('/movie-searcher')}>
                        <div className='work-screen'>
                            01
                        </div>
                        <div className='work-desc'>
                            Movie Searcher
                        </div>
                    </div>
                    <div className='work-card' onClick={() => navigateTo('/to-do-list')}>
                        <div className='work-screen'>
                            02
                        </div>
                        <div className='work-desc'>
                            TO-DO LIST
                        </div>
                    </div>
                    <div className='work-card' onClick={() => navigateTo('/leap-to-riches')}>
                        <div className='work-screen'>
                            03
                        </div>
                        <div className='work-desc'>
                            LEAP TO RICHES
                        </div>
                    </div>
                    <div className='work-card'>
                        <div className='work-screen'>
                            04
                        </div>
                        <div className='work-desc'>
                            NOW IDK
                        </div>
                    </div>
                    <div className='work-card'>
                        <div className='work-screen'>
                            05
                        </div>
                        <div className='work-desc'>
                            NOW IDK
                        </div>
                    </div>
                    <div className='work-card'>
                        <div className='work-screen'>
                            06
                        </div>
                        <div className='work-desc'>
                            NOW IDK
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageShowLogic;
