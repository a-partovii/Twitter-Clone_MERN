// محتوای این کامپوننت موقتیه و احتمالا پنجاه درصدش تغییر می‌کنه
import { FaSearch } from "react-icons/fa";
import "./RightSidebar.css";

const RightSidebar = () => {
    return (
        <aside className='right-sidebar'>
            <div className='right-sidebar-content'>
                {/* Search */}
                <div className='search-box'>
                    <FaSearch className='search-icon' />
                    <input type='text' placeholder='Search Twitter' className='search-input' />
                </div>

                {/* Who to follow, (static sample data instead of context) */}
                <div className='who-to-follow'>
                    <h2 className='section-title'>Who to follow</h2>
                    <div className='users-list'>
                        <div className='user-card'>
                            <img
                                src='/pfp-images/pfp+this-is-elon-musk.jpg'
                                alt='this-is-elon-musk'
                                className='user-card-avatar'
                            />
                            <div className='user-card-info'>
                                <div className='user-card-name'>Elon Musk</div>
                                <div className='user-card-username'>@this-is-elon-musk</div>
                            </div>
                            <button className='follow-button'>Follow</button>
                        </div>
                        <div className='user-card'>
                            <img
                                src='/pfp-images/pfp+torvalds.jpg'
                                alt='torvalds'
                                className='user-card-avatar'
                            />
                            <div className='user-card-info'>
                                <div className='user-card-name'>Linus Torvalds</div>
                                <div className='user-card-username'>@torvalds</div>
                            </div>
                            <button className='follow-button'>Follow</button>
                        </div>
                    </div>
                    <button className='show-more'>Show more</button>
                </div>

                {/* Trends (static)*/}
                <div className='trends'>
                    <h2 className='section-title'>Trends for you</h2>
                    <div className='trends-list'>
                        <div className='trend-item'>
                            <div className='trend-category'>Technology · Trending</div>
                            <div className='trend-name'>#ReactJS</div>
                            <div className='trend-count'>12.5K Tweets</div>
                        </div>
                        <div className='trend-item'>
                            <div className='trend-category'>Technology · Trending</div>
                            <div className='trend-name'>#JavaScript</div>
                            <div className='trend-count'>8.2K Tweets</div>
                        </div>
                        <div className='trend-item'>
                            <div className='trend-category'>Entertainment · Trending</div>
                            <div className='trend-name'>#BrainRot</div>
                            <div className='trend-count'>5.1K Tweets</div>
                        </div>
                    </div>
                    <button className='show-more'>Show more</button>
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
