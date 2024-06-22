var a = require('buffer/')
var s = require('node-forge');
var r = {
    name: "live",
    production: !0,
    apiUrl: "https://digiapp.vietcombank.com.vn",
    apiPath: "",
    socketUrl: "/w2",
    mediaBaseUrl: "https://digibankm5.vietcombank.com.vn",
    uploadAvatarUrl: "https://digibankm5.vietcombank.com.vn/upfile/avatar_upload",
    removeAvatarUrl: "https://digibankm5.vietcombank.com.vn/contact/remove_my_avatar",
    uploadAES: "2dcd8b543bd95a83",
    uploadHMac: "94280a1454bc5634a33181125fcedc08",
    token: "dmNiOjI3YWNkNDM1YmRiMjU5NTRhY2Q2NDliNmE1MTNmYmI5",
    publicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwOVdGekJpTHdweHRGT0QyZGJxY0xRSHBSZmJndE1TaTIxMUN4bnV5dHFYUUVnOTRLcWlGS2dJeEdYc285ZUlqWnpOOUc2Nm9GZDNTeS8vZnpkU0ZOZ0RBMWJEa0ovWnVRTzZ4Y05xNFg3R042eW1rdjhDTHFSTDdrSmR4WEk5ZmNxMWJnQmowUExQZjE2SzRjWjladzdZdHRtQUs3aEFmVzdSaTBMWmg5QU1FUFJQYkVuKzZMcHdia2huc3I0dXM0QUNXWUMxa2pha0txTUwrRDFyc1I4YXlCWXJKQVl1a0ovYzkyM2FzODQ0Z1pkYWNuYms0V2I4UXVReFBmTStCaVdOZ0d4VXFjNkRyTzNzVVl1ZmpZekFIaU9hUnNCWC8zV2krUFhrVjZaRkZEbFhSK2k0MGpqTXRDc3lRQThsUFhUOWsvRmpTRUNtRks1MkZ2a0UvZlFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t",
    pciEnpoint: "https://iframe.vietcombank.com.vn",
    secretKey: "79a96ccb09b127f81a0f48c23ef7c084e5132862a39c643c3964b6bd24e98685",
    crcKey: "6q93-@u9",
    storeKey: {
        LANGUAGE: "lang",
        USER_INFO: "6f666e695f726573755f696e6d6f",
        LOGIN_STATE: "65746173655f6e69676f6c5f696e6d6f",
        TOKEN_OTP: "70746f5f6e656b6f745f696e6d6f",
        SESSION_TIMEOUT: "74756f656d69745f6e6f69737365735f696e6d6f",
        LANGUAGE_CACHE_STORAGE_PREFIX: "omni.app_lang_",
        ACCESS_KEY: "79656b5f7373656363615f696e6d6f",
        APP_EVENT: "746e6576655f7070615f696e6d6f",
        MENU: "756e656d5f696e6d6f",
        VERSION: "6e6f69737265765f696e6d6f",
        MODE_DEBUG: "omni.hercu"
    }
}
class e {
    constructor() {
        this.isActive = !1,
        this.keys = null,
        this.clientPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA+IV9f+XtJReMJxXdfz6dF1YqJ7A+BwgnfrIN+0iLBTC+VgHmRA6hnkvgxurBnZjNyS3uVWQJl/gYxpi8XH7D8MI5Qzld94sm93+5tvi24KqMwovPGG8JOieoMZOrpNMsqCxMSNIWttb6D8TgkzfA++jtozUsFEqU8lgSNip+0wIDAQAB",
        this.clientPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDA+IV9f+XtJReMJxXdfz6dF1YqJ7A+BwgnfrIN+0iLBTC+VgHm
RA6hnkvgxurBnZjNyS3uVWQJl/gYxpi8XH7D8MI5Qzld94sm93+5tvi24KqMwovP
GG8JOieoMZOrpNMsqCxMSNIWttb6D8TgkzfA++jtozUsFEqU8lgSNip+0wIDAQAB
AoGBAIXeovTqen7m4YwYPWH4+V4Pp3X9LJYLWMvVZ/6tGalgA223yv+MrT3PzEH2
nTuOckgozdVupcTGCZZeh+z8me9sVm2NkLDoZbyysx7FwQsf8e/ZqjEsRn8MgDvI
H+PoAX7cn6BBLC81VWknU9Y90gf+NQDtxEfaspbo1JIGK0PZAkEA+Gj5KIUa8jQe
YFBloNa/InTMLPdTDhtlrSRNy7/6W2bndIoYGpN4/3i3Bvoynn+KDVGwhasZJPwG
+IjR4N6h1wJBAMbd6RIPRKoeccZ6arj8JxGzo5xmCDmxrlsuBWCy/q5yX++EJ0gm
JJR7hZodWKiHa4Ep5qPrqt+1EcV4Lz1l42UCQGjAO3Euz/IasESFIpX0eJ0bC45a
rRdhzjp4+KVWy0gH2Mp4AToTvg5c5TF4CCh2N8zuCbYUNII4FOhxKa/dsfkCQCzg
RMkbgu40wo38b/rgg9x9wiz35WFHlEXlI7eHjOtGyhldpBOm79hF64c0mh4luP/D
udVByCSFUsZR8a8UP/UCQFfi4zkfoBA/zuzLAjicWUCZqwhSoE2RYpjZR9v+GiJQ
3ayAEFwIK6DdwKujb2b6j5X3qNHWLNug5tLdUwdefuw=
-----END RSA PRIVATE KEY-----`,
        this.encryptText = e=>{
            try {
                return e && "string" == typeof e ? (e = window.btoa(unescape(encodeURIComponent(e))),
                e = (e = Array.from(e).reverse()).join(""),
                window.btoa(unescape(encodeURIComponent(e)))) : e
            } catch (n) {
                return console.log(n),
                e
            }
        }
        ,
        this.decryptText = e=>{
            try {
                return e && "string" == typeof e ? (e = decodeURIComponent(escape(window.atob(e))),
                e = (e = Array.from(e).reverse()).join(""),
                decodeURIComponent(escape(window.atob(e)))) : e
            } catch (n) {
                return console.log(n),
                e
            }
        }
    }
    get defaultPublicKey() {
        const {publicKey: e} = r;
        return e
    }
    genKeys() {
        this.keys || (console.time("Generate keys..."),
        this.keys = s.pki.rsa.generateKeyPair({
            bits: 1024,
            workers: 1
        }),
        this.clientPublicKey = s.pki.publicKeyToPem(this.keys.publicKey).replace(/(-|(BEGIN|END) PUBLIC KEY|\r|\n)/gi, ""),
        this.clientPrivateKey = s.pki.privateKeyToPem(this.keys.privateKey),
        this.isActive = !0,
        console.timeEnd("Generate keys...")),
        console.log(this.clientPublicKey, this.clientPrivateKey);
    }
    encryptRequest(e) {
        try {
            const n = s.random.getBytesSync(32)
              , t = s.random.getBytesSync(16);
            e = Object.assign({
                clientPubKey: this.clientPublicKey
            }, e);
            const i = s.cipher.createCipher("AES-CTR", n);
            i.start({
                iv: t
            }),
            i.update(s.util.createBuffer(s.util.encodeUtf8(JSON.stringify(e)))),
            i.finish();
            const r = a.Buffer.concat([a.Buffer.from(t, "binary"), a.Buffer.from(i.output.data, "binary")])
              , l = s.pki.publicKeyFromPem(s.util.decode64("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwOVdGekJpTHdweHRGT0QyZGJxY0xRSHBSZmJndE1TaTIxMUN4bnV5dHFYUUVnOTRLcWlGS2dJeEdYc285ZUlqWnpOOUc2Nm9GZDNTeS8vZnpkU0ZOZ0RBMWJEa0ovWnVRTzZ4Y05xNFg3R042eW1rdjhDTHFSTDdrSmR4WEk5ZmNxMWJnQmowUExQZjE2SzRjWjladzdZdHRtQUs3aEFmVzdSaTBMWmg5QU1FUFJQYkVuKzZMcHdia2huc3I0dXM0QUNXWUMxa2pha0txTUwrRDFyc1I4YXlCWXJKQVl1a0ovYzkyM2FzODQ0Z1pkYWNuYms0V2I4UXVReFBmTStCaVdOZ0d4VXFjNkRyTzNzVVl1ZmpZekFIaU9hUnNCWC8zV2krUFhrVjZaRkZEbFhSK2k0MGpqTXRDc3lRQThsUFhUOWsvRmpTRUNtRks1MkZ2a0UvZlFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t")).encrypt(s.util.encode64(n));
            return {
                d: r.toString("base64"),
                k: s.util.encode64(l)
            }
        } catch (n) {
            console.log(n)
        }
    }
    decryptResponse(e) {
        const {k: n, d: t} = e
          , i = s.pki.privateKeyFromPem(this.clientPrivateKey)
          , r = s.util.decodeUtf8(i.decrypt(s.util.decode64(n)))
          , l = a.Buffer.from(t, "base64")
          , o = l.slice(0, 16)
          , u = l.slice(16)
          , c = s.cipher.createDecipher("AES-CTR", a.Buffer.from(r, "base64").toString("binary"));
        return c.start({
            iv: o.toString("binary")
        }),
        c.update(s.util.createBuffer(u)),
        c.finish(),
        s.util.decodeUtf8(c.output.data)
    }
    encryptUpload(e) {
        const {uploadAES: n, uploadHMac: t} = r
          , i = n
          , l = t
          , o = s.random.getBytesSync(16)
          , u = JSON.stringify(e)
          , c = s.cipher.createCipher("AES-CTR", a.Buffer.from(i, "utf8").toString("binary"));
        c.start({
            iv: o
        }),
        c.update(s.util.createBuffer(s.util.encodeUtf8(u))),
        c.finish();
        const h = a.Buffer.concat([a.Buffer.from(o, "binary"), a.Buffer.from(c.output.data, "binary")])
          , d = Date.now()
          , g = s.hmac.create();
        g.start("SHA256", l),
        g.update(h.toString("base64") + d);
        const m = a.Buffer.from(g.getMac().data, "binary");
        return {
            timestamp: d,
            data: encodeURIComponent(h.toString("base64")),
            dataForm: h.toString("base64"),
            mac: encodeURIComponent(m.toString("base64")),
            macForm: m.toString("base64")
        }
    }
    decryptUpload(e) {
        const {e: n} = e
          , {uploadAES: t} = r
          , i = t
          , l = a.Buffer.from(n, "base64")
          , o = l.slice(0, 16)
          , u = l.slice(16)
          , c = s.cipher.createDecipher("AES-CTR", a.Buffer.from(i, "utf8").toString("binary"));
        return c.start({
            iv: o.toString("binary")
        }),
        c.update(s.util.createBuffer(u)),
        c.finish(),
        s.util.decodeUtf8(c.output.data)
    }
    encryptDataText(e) {
        if (e)
            return btoa(unescape(e)).split("").reverse().join("")
    }
    decryptDataText(e) {
        if (e)
            return escape(window.atob(e.split("").reverse().join("")))
    }
    encryptPCI(e, n) {
        if (!n)
            throw new Error("Error crypto: not have publickey");
        n.search(/BEGIN PUBLIC KEY/gi) < 0 && (n = `-----BEGIN PUBLIC KEY-----\n${n}\n-----END PUBLIC KEY-----`);
        const t = s.pki.publicKeyFromPem(n).encrypt(e);
        return s.util.encode64(t)
    }
    makeCRCTable() {
        let e;
        const n = [];
        for (let t = 0; t < 256; t++) {
            e = t;
            for (let n = 0; n < 8; n++)
                e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
            n[t] = e
        }
        return n
    }
    crc32(e) {
        const n = this.makeCRCTable();
        let t = -1;
        for (let i = 0; i < e.length; i++)
            t = t >>> 8 ^ n[255 & (t ^ e.charCodeAt(i))];
        return (-1 ^ t) >>> 0
    }
    generateKeyPCI() {
        return i.a(this, void 0, void 0, (function*() {
            const e = yield s.pki.rsa.generateKeyPair({
                bits: 1024,
                workers: 1
            });
            return {
                public: s.pki.publicKeyToPem(e.publicKey).replace(/(-|(BEGIN|END) PUBLIC KEY|\r|\n)/gi, ""),
                private: s.pki.privateKeyToPem(e.privateKey)
            }
        }
        ))
    }
    decryptPCI(e, n) { 
        if (!n)
            throw new Error("Error crypto: not have privateKey");
        n.search(/BEGIN RSA PRIVATE KEY/gi) < 0 && (n = `-----BEGIN RSA PRIVATE KEY-----\n${n}\n-----END RSA PRIVATE KEY-----`);
        const t = s.pki.privateKeyFromPem(n).decrypt(s.util.decode64(e));
        return s.util.decodeUtf8(t)
    }
}


const CRYPT_EXB = new e();

exports.CRYPT_EXB = CRYPT_EXB