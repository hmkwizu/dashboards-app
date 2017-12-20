import 'babel-polyfill';

import { getCustomDashboards } from '../reducers/dashboards';
import { apiFetchDashboards, apiFetchSelected } from '../api';
import { arrayToIdMap, orArray } from '../util';
import * as fromReducers from '../reducers';
import { getShapedItems } from '../ItemGrid/gridUtil';

const { actionTypes } = fromReducers;

// object creators

// controlbar

export const tSetControlBarRows = rows => ({
    type: actionTypes.SET_CONTROLBAR_ROWS,
    value: rows,
});

export const tSetControlBarExpanded = expanded => ({
    type: actionTypes.SET_CONTROLBAR_EXPANDED,
    value: !!expanded,
});

// dashboards

export const acSetDashboards = (dashboards, append) => ({
    type: actionTypes.SET_DASHBOARDS,
    append: !!append,
    value: arrayToIdMap(getCustomDashboards(dashboards)),
});

// export const acAddDashboardItem = favorite => ({
//     type: actionTypes.ADD_DASHBOARD_ITEM,
//     value: {
//         type: favorite.type,
//         shape: {
//             x:
//         }

//     }
// })

// selected

export const acSetSelectedId = value => ({
    type: actionTypes.SET_SELECTED_ID,
    value,
});

export const acSetSelectedEdit = value => ({
    type: actionTypes.SET_SELECTED_EDIT,
    value,
});

export const acSetSelectedIsLoading = value => ({
    type: actionTypes.SET_SELECTED_ISLOADING,
    value,
});

// filter

export const acSetFilterName = value => ({
    type: actionTypes.SET_FILTER_NAME,
    value,
});

export const acSetFilterOwner = value => ({
    type: actionTypes.SET_FILTER_OWNER,
    value,
});

export const acSetFilterOrder = value => ({
    type: actionTypes.SET_FILTER_ORDER,
    value,
});

// thunk creators

// dashboards

export const tSetDashboards = () => async (dispatch, getState) => {
    const onSuccess = data => {
        dispatch(acSetDashboards(data.toArray()));
        return data;
    };

    const onError = error => {
        console.log('Error (apiFetchDashboards): ', error);
        return error;
    };

    try {
        const collection = await apiFetchDashboards();
        return onSuccess(collection);
    } catch (err) {
        return onError(err);
    }
};

// selectedDashboard

export const tSetSelectedDashboardById = id => async dispatch => {
    dispatch(acSetSelectedIsLoading(true));

    const onSuccess = selected => {
        dispatch(
            acSetDashboards(
                {
                    ...selected,
                    dashboardItems: getShapedItems(selected.dashboardItems),
                },
                true
            )
        );
        dispatch(acSetSelectedId(id));
        dispatch(acSetSelectedIsLoading(false));
        return selected;
    };

    const onError = error => {
        console.log('Error: ', error);
        return error;
    };

    try {
        const fetchedSelected = await apiFetchSelected(id);
        return onSuccess(fetchedSelected);
    } catch (err) {
        return onError(err);
    }
};
