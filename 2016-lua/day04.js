const fs = require('fs');

const input = fs.readFileSync('./inputs/4', 'utf8');

const rooms = input.split('\n')
rooms.pop();

function processRoom(room) {
    const checkSum = room.match(/\[([a-z]+)\]/)[1];
    const sectorId = parseInt(room.match(/(\d+)\[/)[1]);
    const encryptedName = room.match(/([a-z\-]+)-/)[1];
    const letters = encryptedName.split('-').join('').split('');
    const letterCount = letters.reduce((acc, letter) => {
        acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
        return acc;
    }, {});
    const sortedLetters = Object.keys(letterCount).sort((a, b) => {
        if (letterCount[a] === letterCount[b]) {
            return a < b ? -1 : 1;
        }
        return letterCount[b] - letterCount[a];
    });
    const calculatedCheckSum = sortedLetters.slice(0, 5).join('');
    return {
        checkSum,
        sectorId,
        encryptedName,
        calculatedCheckSum,
    };
}

function isRealRoom(room) {
    return room.checkSum === room.calculatedCheckSum;
}

function decryptName(room) {
    const letters = room.encryptedName.split('-').join('').split('');
    const decryptedLetters = letters.map(letter => {
        const charCode = letter.charCodeAt(0);
        const newCharCode = ((charCode - 97 + room.sectorId) % 26) + 97;
        return String.fromCharCode(newCharCode);
    });
    return decryptedLetters.join('');
}

console.log(rooms.reduce((acc, room) => {
    const processedRoom = processRoom(room);
    if (isRealRoom(processedRoom)) {
        acc += processedRoom.sectorId;
    }
    return acc;
},0));

console.log(rooms.map(processRoom).map(el => {
    return {
        ...el,
        decryptedName: decryptName(el),
    }
}).filter(el => el.decryptedName.includes('northpole'))[0].sectorId);




