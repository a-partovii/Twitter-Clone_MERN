// Sample data for developing tests
export const sampleUsers = [
    {
        user_id: "a-partovii",
        passsword: "11112222",
        name: "Ashkan Partovi",
        email: "ap@gmail.com",
        bio: "Lifelong Learner, for real!",
        profileAvatar: "/pfp-images/pfp+a-partovii.jpg",
        profileBanner: "/banner-images/banner+a-partovii.jpg",
        followersList: ["safa-mh", "meowmeowmeow"],
        followingList: ["safa-mh", "meowmeowmeow"],
        joinedDate: "January 2024",
        verified: true,
    },
    {
        user_id: "safa",
        passsword: "11112222",
        name: "Mohammadhosein",
        email: "Mohamad@gmail.com",
        bio: "Programmer and Chess Player",
        profileAvatar: "/pfp-images/pfp+safa-mh.jpg",
        profileBanner: "/banner-images/banner+safa-mh.webp",
        followersList: ["a-partovii"],
        followingList: [],
        joinedDate: "January 2025",
        verified: true,
    },
    {
        user_id: "meowmeowmeow",
        passsword: "11112222",
        name: "Mr. Meow",
        email: "meow@gmail.com",
        bio: "right that stuff",
        profileAvatar: "",
        profileBanner: "",
        followersList: ["a-partovii"],
        followingList: ["a-partovii"],
        get followersCount() {
            return this.followersList.length;
        },
        get followingCount() {
            return this.followingList.length;
        },
        joinedDate: "January 2026",
        verified: false,
    },
    {  user_id: "Mojavad",
        passsword: "11111111",
        name: "Mohammad Javad",
        email: "javad@gmail.com",
        bio: "الهی، همان که تو خواهی",
        profileAvatar: "",
        profileBanner: "",
        followersList: ["a-partovii"],
        followingList: [],
        joinedDate: "January 2025",
        verified: false
    },
    {
        user_id: "safa-mh",
        passsword: "11112222",
        name: "Safa MH",
        email: "safa@gmail.com",
        bio: "Programmer and Chess Player",
        profileAvatar: "/pfp-images/pfp+safa-mh.jpg",
        profileBanner: "/banner-images/banner+safa-mh.webp",
        followersList: ["a-partovii"],
        followingList: [],
        joinedDate: "January 2025",
        verified: false,
    }

];

// export function syncUserCounts(users) {
//     return users.map(user => ({
//         ...user,
//         followersCount: user.followersList?.length || 0,
//         followingCount: user.followingList?.length || 0
//     }));
// }

export const sampleTweets = [
    {
        id: "t1",
        text: "Just launched my new project! Check it out!",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        authorId: "a-partovii",
        createdAt: "2024-01-01T10:00:00.000Z",
        likes: ["user1", "user3", "user4"],
        retweets: ["user2"],
        replies: [],
        bookmarks: ["user2"],
    },
    {
        id: "t2",
        text: "Nature never fails to amaze me🌅",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        authorId: "meowmeowmeow",
        createdAt: "2024-01-01T07:00:00.000Z",
        likes: ["safa-mh", "a-partovii"],
        retweets: ["safa-mh"],
        replies: [],
        bookmarks: [],
    },
    {
        id: "t3",
        text: "Playing one chess game burns as much energy as walking 100 kilometers.",
        image: "",
        authorId: "safa-mh",
        createdAt: "2023-12-31T10:00:00.000Z",
        likes: ["a-partovii"],
        retweets: [],
        replies: [],
        bookmarks: [],
    },
    {
        id: "t4",
        text: "I'm tired boss😭😭",
        image: "data:image/jpeg;base64,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",
        authorId: "meowmeowmeow",
        createdAt: "2023-12-29T10:00:00.000Z",
        likes: ["a-partovii"],
        retweets: [],
        replies: [],
        bookmarks: [],
    },
    {
        id: "t5",
        text: "I've always been fascinated by decentralized systems and distributed server technologies. I'd like to see more of them in future tech!\n By spreading data across P2P networks, they offer heightened security, censorship resistance, and infinite scalability.\nLooking at our current world, wherever distributed services exist, they've been hotspots for controversy, like cryptocurrencies, torrent networks, and more...\nBut the world ahead is a world of freedom, a world of free expression! isn't it?! It truly depends on a choice, after all, do we really want it?! Are we ready for it?!\nI see a bright future for development of this techs. Even as auxiliary modules alongside existing platforms, they can cut costs, bolster privacy, and promote honesty and anti-censorship. Decentralized systems practically embody the full potential of Web3 theory.",
        image: "https://plus.unsplash.com/premium_photo-1681400678259-255b10890b08?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        authorId: "a-partovii",
        createdAt: "2023-12-27T10:00:00.000Z",
        likes: ["safa-mh", "meowmeowmeow"],
        retweets: [],
        replies: [],
        bookmarks: [],
    },
];
