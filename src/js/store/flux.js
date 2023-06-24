const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			detailPage: {
				type: "none",
				info: {},
			},
			favorites: [
			]
		},
		actions: {
			setDetailPage: (type, itemInfo) => {
				//get the store
				const store = getStore();
				//we have to loop the entire favorites array to look for the respective index
				store.detailPage.type = type;
				store.detailPage.info = itemInfo;
				setStore(store);
			},
			removeItemFromFavorites: (itemIndex) => {
				//get the store
				const store = getStore();
				//we have to loop the entire favorites array to look for the respective index
				const newFavorites = store.favorites.filter((_, index) => index !== itemIndex);
				setStore({ demo: store.demo, favorites: newFavorites });
			},

			addItemFromFavorites: (type, itemInfo) => {
				//get the store
				const store = getStore();
				// adds type to item info
				itemInfo.type = type;
				//adds item
				store.favorites[store.favorites.length] = itemInfo;
				//we have to loop the entire favorites array to look for the respective index
				setStore(store);
			},

			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo, favorites: store.favorites });
			}
		}
	};
};

export default getState;
