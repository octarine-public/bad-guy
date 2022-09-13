import { Courier, Creep, EntityManager, Hero, LocalPlayer, Unit } from "github.com/octarine-public/wrapper/index"
import { ControllablesMode, ModeSpinner, SpinnerKey, State } from "./Menu"

function MoveUnit(x: Unit) {
	switch (ModeSpinner.selected_id) {
		case 0: x.MoveTo(x.InFrontFromAngle(300, 1), false, true); break
		case 1: x.MoveTo(x.InFrontFromAngle(250, 50), false, true); break
	}
}

var it = 0, b = false
export function Tick() {
	if (!b) {
		b = true
		return
	}
	b = false
	if (!State.value || !SpinnerKey.is_pressed)
		return
	const Units = [
		...EntityManager.GetEntitiesByClass(Hero),
		...EntityManager.GetEntitiesByClass(Creep),
		...EntityManager.GetEntitiesByClass(Courier),
	]
	let ar = ControllablesMode.selected_id !== 0
		? Units.filter(x => !x.IsEnemy() && x.IsControllable)
		: [LocalPlayer!.Hero] as Unit[]
	ar = ar.filter(ent => ent.IsAlive && ent.IsVisible && !ent.IsStunned && !ent.IsHexed)
	if (ControllablesMode.selected_id === 2)
		ar = ar.filter(ent => ent instanceof Courier)
	if (ar.length === 0)
		return
	if (it >= ar.length)
		it = 0
	MoveUnit(ar[it])
	it++
}
