import { Menu, MenuBase } from "../Base/MenuBase"
const { BaseTree, State } = MenuBase(Menu, "Auto Laugh")
const Interval = BaseTree.AddSlider("Delay", 15, 15, 120)
export {
	State,
	BaseTree,
	Interval,
}
