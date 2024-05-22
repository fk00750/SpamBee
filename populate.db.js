const fs = require('fs')
const { AuthManager } = require('./src/utils/auth.manager')
const db = require('./src/models')
const { ContactManger } = require('./src/utils/contact.manager')
const authManger = new AuthManager()
const contactManger = new ContactManger()
async function createUsers() {
    const users = JSON.parse(fs.readFileSync("./users.json", 'utf-8'))

    for (const user of users) {
        const { name, phone, password } = user
        await authManger.createUser(name, phone, password)
    }

    console.log('users created')
}

async function getRandomContacts(contacts, count) {
    // Shuffle contacts array and return the first 'count' elements
    const shuffled = contacts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function AddContacts() {
    // Load contacts from the contacts.json file
    const contacts = JSON.parse(fs.readFileSync('./contacts.json', 'utf-8'));

    // Fetch all users from the database
    const users = await db.User.findAll({
        attributes: ['id', 'userId', 'name', 'phone'],
        raw: true
    });

    // Iterate over each user and assign 5 random contacts
    for (const user of users) {
        // Fetch existing contacts for the user
        const existingContacts = await db.Contact.findAll({
            where: { userId_ref: user.id },
            attributes: ['contactId'],
            raw: true
        });

        // Get the phone numbers of the existing contacts
        const existingContactPhones = new Set(existingContacts.map(contact => contact.contactPhone));

        // Filter out contacts that are already assigned to the user
        const availableContacts = contacts.filter(contact => !existingContactPhones.has(contact.phone));

        // Get 5 random contacts from the available contacts
        const randomContacts = await getRandomContacts(availableContacts, 5);

        // Add each random contact to the user
        for (let i = 0; i < randomContacts.length; i++) {
            const contact = randomContacts[i];
            const contactId = await authManger.createUniqueId('contact')

            const variation = i + 1; // Variation number
            const newName = `${contact.name} ${variation}`;

            await db.Contact.create({
                userId_ref: user.id,
                userId: user.userId,
                contactId: contactId, // Assuming contacts.json has unique ids for contacts
                name: newName,
                phone: contact.phone
            });

            console.log(`Added contact ${contact.phone} to user ${user.userId}`);
        }
    }
}

function markNumberSpam() {
    const phoneNumbers = JSON.parse(fs.readFileSync('./phoneNumbers.json', 'utf-8'));


    // get users from database
    // get contacts from database

    // get a mix numbers 
}

const main = async () => {
    // await createUsers()
    await AddContacts()
}

main()