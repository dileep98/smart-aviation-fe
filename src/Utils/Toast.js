import toast from 'react-hot-toast';

export const notify = (message, type) => {
    switch (type) {
        case 's':
            toast.success(message)
            break;
        case 'e':
            toast.error(message)
            break;
        default:
            toast(message)
            break;
    }
}

export default notify