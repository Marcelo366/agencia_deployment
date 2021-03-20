import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    //Validar campos
    const {nombre, correo, mensaje} = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }
    
    if (correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }
    
    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if (errores.length > 0) {
        try {
            const testimoniales = await Testimonial.findAll();

            res.render('testimoniales', {
                pagina: "Testimoniales",
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}