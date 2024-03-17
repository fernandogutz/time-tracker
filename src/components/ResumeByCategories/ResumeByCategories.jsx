import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ResumeByCategories.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Descubre en qué estás usando tu tiempo',
        },
    },
};



const ResumeByCategories = ({activities}) => {

    const [categoriesAndHours, setCategoriesAndHours] = useState({});

    console.log(categoriesAndHours);
    console.log(Object.keys(categoriesAndHours));
    console.log(Object.values(categoriesAndHours));

    useEffect(() => {
        const tempCategoriesAndHours = {};

        activities.forEach((activity, index) => {
            const start = new Date(activity.start);
            const end = new Date(activity.end);
            const difference = (end - start); // Convertir diferencia de tiempo de milisegundos a horas
            const hours = difference / (1000 * 60 * 60);

            console.log(`${index}\n${activity.Activity}\n${start} \n+ ${end} \n= ${difference} \n= ${hours} h`);

            if (tempCategoriesAndHours[activity.Category]) {
                tempCategoriesAndHours[activity.Category] += hours;
            } else {
                tempCategoriesAndHours[activity.Category] = hours;
            }
        });

        setCategoriesAndHours(tempCategoriesAndHours);
        
    }, [activities]); // Dependencia de `activities` para recalcular cuando cambie



    const data = {
        labels: Object.keys(categoriesAndHours),
        datasets: [{
          label: '# horas',
          data: Object.values(categoriesAndHours),
          borderColor: ['rgba(75, 192, 192, 1)'], // Colores personalizados para los bordes de cada barra
          borderWidth: 1
        }]
    }

    return (
        <div className="ResumeByCategories">
        <h2>Resumen por Categorías</h2>
            { Object.keys(categoriesAndHours).length > 0 && <Bar options={options} data={data} />}
        </div>

    )
}

export default ResumeByCategories