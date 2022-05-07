import { Menu as MenuSDK } from "wrapper/Imports"
export let Menu = MenuSDK.AddEntryDeep(["Utility", "Bad Guy"], ["panorama/images/hud/reborn/icon_magic_resist_psd.vtex_c"])
export let MainState = Menu.AddToggle("State")

export function MenuBase(root: MenuSDK.Node, name: string) {
	const BaseTree = root.AddNode(name)
	return {
		BaseTree,
		State: BaseTree.AddToggle("State"),
	}
}
