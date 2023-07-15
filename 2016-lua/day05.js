const fs = require('fs')
const crypto = require('crypto')
const input = fs.readFileSync('./inputs/5', 'utf8').trim()
function getHash (input) {
    return crypto.createHash('md5').update(input).digest("hex")
}

function checkHash (hash) {
    return hash.slice(0,5) === '00000'
}

function getPass (doorId) {
    let pass = ''
    let i = 0
    while (pass.length < 8) {
        let hash = getHash(doorId + i)
        if (checkHash(hash)) {
            pass += hash[5]
        }
        i++
    }
    return pass
}

console.log(getPass(input))

function getPass2 (doorId) {
    let pass = '________'
    let i = 0
    while (pass.indexOf('_') !== -1) {
        let hash = getHash(doorId + i)
        if (checkHash(hash)) {
            let pos = parseInt(hash[5])
            if (pos < 8 && pass[pos] === '_') {
                pass = pass.slice(0, pos) + hash[6] + pass.slice(pos + 1)
            }
            console.log(pass)
        }
        i++
    }
    return pass
}

console.log(getPass2(input))
