import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

                <Link
                    className="navbar-brand"
                    to="/listaReportes"
                >
                    G18
                </Link>

                <div className="navbar-collapse">
                    <div className="navbar-nav">

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/listaReportes"
                        >
                            Reportes
                        </NavLink>

                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/registrarReporte"
                        >
                            Registrar Reporte
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>

    )
}