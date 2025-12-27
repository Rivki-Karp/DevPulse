import Swal from "sweetalert2";

export const showWarningAlert = (title: string, text: string) => {
    return Swal.fire({
        icon: 'warning',
        title,
        text,
        background: '#0d1620',
        color: '#fff',
        confirmButtonColor: '#00ffa3'
    });
};


export const showSuccessAlert = (title: string, text: string) => {
        return  Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonText: 'ok',
                confirmButtonColor: '#00ffa3',
                background: '#0d1620',
                color: '#fff'
            });
}
export default showWarningAlert;
