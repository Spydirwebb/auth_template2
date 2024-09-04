export const generateToken = (n) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n.length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    //console.log(token)
    return token;
}

export async function getReminders() {
    let url = `api/reminders`
    let reminders = null
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            reminders = json
        })
        .finally(() =>  {
            return reminders
        })
        .catch((e) => {
            throw new Error("Can't fetch Reminders")
        })

}