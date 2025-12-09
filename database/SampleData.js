// Sample data for developing tests
export const sampleUsers = [
    {
        user_id: 'a-partovii',
        name: 'Ashkan Partovi',
        email: 'ap@gmail.com',
        bio: 'Drug dealer and stuff',
        profileImage: '' || "",
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
        profileImage: '' || "",
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
        profileImage: '' || "",
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
