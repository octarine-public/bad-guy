import { Menu, MenuBase } from "../Base/MenuBase"
const { BaseTree, State } = MenuBase(Menu, "Auto Taunt")
const Interval = BaseTree.AddSlider("Delay", 15, 1, 120)
export {
	State,
	BaseTree,
	Interval,
}
