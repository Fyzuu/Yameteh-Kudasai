let PhoneNumber = require('awesome-phonenumber')
let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let _pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let ppe = await conn.getProfilePicture(who)
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, premium, level, limit, exp, lastclaim, registered, regTime, age } = global.db.data.users[m.sender]
    let username = conn.getName(who)
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let str = `
]──────────❏ *PROFILE* ❏──────────[
📇 • *Name:* ${username} ${registered ? '(' + name + ') ': ''}
📧 • *Tag:* @${who.replace(/@.+/, '')}
📞 • *Number:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
💻 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${registered ? age : ''}
📮 • *Bio:* ${about ? about : ''}
${readMore}
🌟 • *Premium:* ${premium ? "✅" :"❌"}
📑 • *Registered:* ${registered ? '✅': '❌'}
⛔ • *Banned:* ❌
`.trim()
    conn.send2ButtonImg(m.chat, await conn.getProfilePicture(m.sender),str, global.botdate, 'MENU', '.menu', 'INVENTORY', '.inv', fkon, { contextInfo: { mentionedJid: [who], forwardingScore: 999, isForwarded: true}})
}
handler.help = ['profile [@user]']
handler.tags = ['rpg']
handler.command = /^profile|pp$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)