
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "store";
import { Category } from "store/api/__generated__";

export const useCategories = () => {
	const {
		ApiStore: { api },
	} = useStores();
	const [categoryList, setCategoryList] = useState<Category[]>([]);

	useEffect(() => {
		api.news.newsCategoryList().then(({ data }) => {
			setCategoryList([{ name: 'автобонус', pk: 4 }, ...data]);
		});
	}, []);
	return categoryList;
};