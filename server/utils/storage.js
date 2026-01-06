import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to JSON files
const USERS_FILE = path.join(__dirname, "../../database/users.json");
const TWEETS_FILE = path.join(__dirname, "../../database/tweets.json");

// Helper function to load data from JSON file
const loadFromFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            return JSON.parse(data);
        } else {
            // If file doesn't exist, initialize it with an empty array
            const initialData = [];
            saveToFile(filePath, initialData);
            return initialData;
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error.message);
        // In case of error, don't crash – fall back to an empty array in memory
        return [];
    }
};

// Helper function to save data to JSON file
const saveToFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error(`Error saving ${filePath}:`, error.message);
    }
};

// Load data strictly from JSON files
let users = loadFromFile(USERS_FILE);
let tweets = loadFromFile(TWEETS_FILE);

// Helper function to generate unique ID for tweets
let tweetIdCounter = tweets.length + 1;
const generateTweetId = () => {
    return `t${tweetIdCounter++}`;
};

// Helper function to save users to file
const saveUsers = () => {
    saveToFile(USERS_FILE, users);
};

// Helper function to save tweets to file
const saveTweets = () => {
    saveToFile(TWEETS_FILE, tweets);
};

// User Operation--------------------------

export const getAllUsers = () => {
    return users.map((user) => ({
        ...user,
        followersCount: user.followersList?.length || 0,
        followingCount: user.followingList?.length || 0,
    }));
};

export const getUserById = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    if (!user) return null;

    return {
        ...user,
        followersCount: user.followersList?.length || 0,
        followingCount: user.followingList?.length || 0,
    };
};

export const createUser = (userData) => {
    const newUser = {
        user_id: userData.user_id,
        passsword: userData.passsword || userData.password || "", // Support both typo and correct spelling
        name: userData.name,
        email: userData.email || "",
        bio: userData.bio || "",
        profileAvatar: userData.profileAvatar || "/empty-pfp.png",
        profileBanner: userData.profileBanner || "",
        followersList: userData.followersList || [],
        followingList: userData.followingList || [],
        joinedDate:
            userData.joinedDate ||
            new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        verified: userData.verified || false,
    };

    users.push(newUser);
    saveUsers(); // Save to JSON file
    return newUser;
};

export const updateUser = (userId, updateData) => {
    const userIndex = users.findIndex((u) => u.user_id === userId);
    if (userIndex === -1) return null;

    users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        user_id: userId, // Prevent changing user_id
    };

    saveUsers(); // Save to JSON file
    return users[userIndex];
};

export const followUser = (currentUserId, targetUserId) => {
    if (currentUserId === targetUserId) {
        throw new Error("Cannot follow yourself");
    }

    const currentUser = users.find((u) => u.user_id === currentUserId);
    const targetUser = users.find((u) => u.user_id === targetUserId);

    if (!currentUser || !targetUser) {
        throw new Error("User not found");
    }

    // Add to following list
    if (!currentUser.followingList.includes(targetUserId)) {
        currentUser.followingList.push(targetUserId);
    }

    // Add to followers list
    if (!targetUser.followersList.includes(currentUserId)) {
        targetUser.followersList.push(currentUserId);
    }

    saveUsers(); // Save to JSON file
    return { message: "User followed successfully" };
};

export const unfollowUser = (currentUserId, targetUserId) => {
    const currentUser = users.find((u) => u.user_id === currentUserId);
    const targetUser = users.find((u) => u.user_id === targetUserId);

    if (!currentUser || !targetUser) {
        throw new Error("User not found");
    }

    // Remove from following list
    currentUser.followingList = currentUser.followingList.filter((id) => id !== targetUserId);

    // Remove from followers list
    targetUser.followersList = targetUser.followersList.filter((id) => id !== currentUserId);

    saveUsers(); // Save to JSON file
    return { message: "User unfollowed successfully" };
};

// Tweet Operation--------------------------
export const getAllTweets = () => {
    return tweets
        .map((tweet) => {
            const author = getUserById(tweet.authorId);
            return {
                ...tweet,
                author: author || {
                    user_id: tweet.authorId,
                    name: "Unknown User",
                    profileAvatar: "/empty-pfp.png",
                    verified: false,
                },
            };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getTweetById = (tweetId) => {
    const tweet = tweets.find((t) => t.id === tweetId);
    if (!tweet) return null;

    const author = getUserById(tweet.authorId);
    return {
        ...tweet,
        author: author || {
            user_id: tweet.authorId,
            name: "Unknown User",
            profileAvatar: "/empty-pfp.png",
            verified: false,
        },
    };
};

export const createTweet = (tweetData) => {
    const newTweet = {
        id: generateTweetId(),
        text: tweetData.text,
        image: tweetData.image || "",
        authorId: tweetData.authorId,
        createdAt: new Date().toISOString(),
        likes: [],
        retweets: [],
        replies: [],
        bookmarks: [],
    };

    tweets.push(newTweet);
    saveTweets(); // Save to JSON file

    const author = getUserById(newTweet.authorId);
    return {
        ...newTweet,
        author: author || {
            user_id: newTweet.authorId,
            name: "Unknown User",
            profileAvatar: "/empty-pfp.png",
            verified: false,
        },
    };
};

export const deleteTweet = (tweetId) => {
    const tweetIndex = tweets.findIndex((t) => t.id === tweetId);
    if (tweetIndex === -1) return false;

    tweets.splice(tweetIndex, 1);
    saveTweets(); // Save to JSON file
    return true;
};

export const likeTweet = (tweetId, userId) => {
    const tweet = tweets.find((t) => t.id === tweetId);
    if (!tweet) return null;

    const isLiked = tweet.likes.includes(userId);

    if (isLiked) {
        tweet.likes = tweet.likes.filter((id) => id !== userId);
    } else {
        tweet.likes.push(userId);
    }

    saveTweets(); // Save to JSON file

    const author = getUserById(tweet.authorId);
    return {
        ...tweet,
        author: author || {
            user_id: tweet.authorId,
            name: "Unknown User",
            profileAvatar: "/empty-pfp.png",
            verified: false,
        },
    };
};

export const retweetTweet = (tweetId, userId) => {
    const tweet = tweets.find((t) => t.id === tweetId);
    if (!tweet) return null;

    const isRetweeted = tweet.retweets.includes(userId);

    if (isRetweeted) {
        tweet.retweets = tweet.retweets.filter((id) => id !== userId);
    } else {
        tweet.retweets.push(userId);
    }

    saveTweets(); // Save to JSON file

    const author = getUserById(tweet.authorId);
    return {
        ...tweet,
        author: author || {
            user_id: tweet.authorId,
            name: "Unknown User",
            profileAvatar: "/empty-pfp.png",
            verified: false,
        },
    };
};

export const bookmarkTweet = (tweetId, userId) => {
    const tweet = tweets.find((t) => t.id === tweetId);
    if (!tweet) return null;

    const isBookmarked = tweet.bookmarks.includes(userId);

    if (isBookmarked) {
        tweet.bookmarks = tweet.bookmarks.filter((id) => id !== userId);
    } else {
        tweet.bookmarks.push(userId);
    }

    saveTweets(); // Save to JSON file

    const author = getUserById(tweet.authorId);
    return {
        ...tweet,
        author: author || {
            user_id: tweet.authorId,
            name: "Unknown User",
            profileAvatar: "/empty-pfp.png",
            verified: false,
        },
    };
};
