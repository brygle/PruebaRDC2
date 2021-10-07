import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { RegistrarReporte } from '../components/reportes/RegistrarReporte';
import { ReporteIndividual } from '../components/reportes/ReporteIndividual';
import { Pantalla } from '../components/reportes/Pantalla';
import { Navbar } from '../components/ui/Navbar';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container mt-2">
                    <Switch>
                        <Route exact path="/registrarReporte" component={ RegistrarReporte } />
                        <Route exact path="/listaReportes" component={ Pantalla } />
                        <Route exact path="/reporte/:id" component={ ReporteIndividual } />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
