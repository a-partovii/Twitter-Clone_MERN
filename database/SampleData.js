// Sample data for developing tests
export const sampleUsers = [
    {
        user_id: 'a-partovii',
        name: 'Ashkan Partovi',
        email: 'ap@gmail.com',
        bio: 'Drug dealer and stuff',
        profileAvatar: "/pfp-images/pfp+a-partovii.jpg",
        profileBanner: "/banner-images/banner+a-partovii.jpg",
        followersList: ['aaffaas', 'meowmeowmeow'],
        followingList: ['aaffaas', 'meowmeowmeow'],
        get followersCount() { return this.followersList.length; },
        get followingCount() { return this.followingList.length; },
        joinedDate: 'January 2024',
        verified: true
    },
    {
        user_id: 'aaffaas',
        name: 'Safa MH',
        email: 'safa@gmail.com',
        bio: 'Not a drug dealer or whatever',
        profileAvatar: "",
        profileBanner: "",
        followersList: ['a-partovii'],
        followingList: [],
        get followersCount() { return this.followersList.length; },
        get followingCount() { return this.followingList.length; },
        joinedDate: 'January 2025',
        verified: true
        },
        {
        user_id: 'meowmeowmeow',
        name: 'Mr. Meow',
        email: 'meow@gmail.com',
        bio: 'right that stuff',
        profileAvatar: "",
        profileBanner: "",
        followersList: ['a-partovii'],
        followingList: ['a-partovii'],
        get followersCount() { return this.followersList.length; },
        get followingCount() { return this.followingList.length; },
        joinedDate: 'January 2026',
        verified: true
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
      id: 'tweet1',
      text: 'Just launched my new project! Check it out #coding #webdev',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      authorId: 'a-partovii',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: ['user1', 'user3', 'user4'],
      retweets: ['user2'],
      replies: [],
      bookmarks: ['user2']
    },
    {
      id: 't2',
      text: 'Beautiful sunset today! 🌅 Nature never fails to amaze me. #nature #photography',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      authorId: 'meowmeowmeow',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: ['user2', 'user3', 'user1'],
      retweets: ['user1'],
      replies: [],
      bookmarks: []
    },
    {
      id: 't3',
      text: 'Playing one chess game burns as much energy as walking 100 kilometers.',
      image: '',
      authorId: 'user3',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: ['a-partovii'],
      retweets: [],
      replies: [],
      bookmarks: []
    },
    {
      id: 't4',
      text: "I'm tired boss😭😭",
      image: '',
      authorId: 'aaffaass',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: [],
      retweets: [],
      replies: [],
      bookmarks: []
    },
    {
      id: 't5',
      text: "I've always been fascinated by decentralized systems and distributed server technologies. I'd like to see more of them in future tech!\n By spreading data across P2P networks, they offer heightened security, censorship resistance, and infinite scalability.\nLooking at our current world, wherever distributed services exist, they've been hotspots for controversy—like cryptocurrencies, torrent networks, and more...\nBut the world ahead is one of free expression! Right?!!\nI see a bright future for this tech's development. Even as auxiliary modules alongside existing platforms, they can cut costs, bolster privacy, and promote honesty and anti-censorship. Decentralized systems practically embody the full potential of Web3 theory.", 
      authorId: 'a-partovii',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      likes: ['aaffaass','meowmeowmeow' ],
      retweets: [],
      replies: [],
      bookmarks: []
    }
  ];