"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            name: 'User One',
            role: 'USER',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    await prisma.account.create({
        data: {
            userId: user1.id,
            type: 'oauth',
            provider: 'google',
            providerAccountId: 'google-user1',
            access_token: 'fakeaccesstoken',
            refresh_token: 'fakerefresh',
        },
    });
    await prisma.session.create({
        data: {
            userId: user1.id,
            sessionToken: 'sessiontoken-user1',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
    });
    await prisma.verificationToken.create({
        data: {
            identifier: 'user1@example.com',
            token: 'verify-token-123',
            expires: new Date(Date.now() + 1000 * 60 * 60),
        },
    });
    const story1 = await prisma.story.create({
        data: {
            title: 'First Story',
            content: 'This is the content of the first story',
            authorId: user1.id,
            published: true,
            viewCount: 10,
        },
    });
    const story2 = await prisma.story.create({
        data: {
            title: 'Second Story',
            content: 'Second story with more details',
            authorId: user2.id,
            published: false,
        },
    });
    await prisma.comment.create({
        data: {
            content: 'Nice story!',
            storyId: story1.id,
            authorId: user2.id,
        },
    });
    await prisma.comment.create({
        data: {
            content: 'Thanks for sharing!',
            storyId: story2.id,
            authorId: user1.id,
        },
    });
    await prisma.like.create({
        data: {
            storyId: story1.id,
            userId: user2.id,
        },
    });
    await prisma.like.create({
        data: {
            storyId: story2.id,
            userId: user1.id,
        },
    });
    console.log('✅ Seeding completed!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map