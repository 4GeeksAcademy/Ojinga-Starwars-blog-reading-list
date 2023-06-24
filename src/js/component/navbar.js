import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<nav className="navbar navbar-light bg-light mb-3" style={{ width: "90%" }}>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars</span>
				</Link>
				<div className="ml-auto">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Favorites {store.favorites.length}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{
								store.favorites.map((item, index) => {
									return <Dropdown.Item href="#/action-3" key={index}>
										<Link to={{
											pathname: "/detail",
										}}>
											<Button onClick={() => actions.setDetailPage(item.type, item)} variant="primary">{item.name}</Button>
										</Link>

										<Button onClick={() => actions.removeItemFromFavorites(index)}>🗑️</Button>
									</Dropdown.Item>
								})
							}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</nav>
		</div>
	);
};
