const loginName = prompt('Enter your login', '');
const minName = 4;
const user = 'User';
const admin = 'Admin';

if (typeof loginName !== 'string' || loginName.length === 0) {
    alert('Canceled');
} else if (loginName.length < minName && loginName.length > 0) {
    alert(`I don't know any users having name length less than 4 symbols`);
} else if (loginName === user || loginName === admin) {
    const passwordName = prompt('Enter your password', '');
    if (typeof passwordName !== 'string') {
        alert('Canceled');
    } else if (loginName === user && passwordName !== user + 'Pass' ) {
        alert('Wrong password');
    } else if (loginName === admin && passwordName !== 'RootPass' ) {
        alert('Wrong password');
    } else {
        const newDate = new Date().getHours();
        const day = 8;
        const night = 20;

        if (newDate >= day && newDate < night) {
            alert('Good day, dear ' + loginName + '!');
        } else {
            alert('Good evening, dear ' + loginName + '!');
        }   
    }
} else {
    alert(`I don’t know you`);
}
