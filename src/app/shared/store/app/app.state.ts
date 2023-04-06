import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateNavigatorPosition } from './app.actions';

export interface AppStateModel {
  navigatorPosition: string
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    navigatorPosition: '-50',
  },
})
@Injectable()
export class AppState {
  constructor() {}

  @Selector([AppState])
  static navigatorPosition(state: AppStateModel) {
    return state.navigatorPosition;
  }

  @Action(UpdateNavigatorPosition)
  updateNavigatorPosition(
    ctx: StateContext<AppStateModel>,
    { state }: UpdateNavigatorPosition
  ) {
    const device: AppStateModel = ctx.getState();
    device.navigatorPosition = state;
    ctx.patchState(device);
  }
}
