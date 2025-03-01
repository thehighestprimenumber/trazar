import {COLOUR} from "../../theme";

export const styles = {
  panelContainer: {
     borderBottom: '3px solid ' + COLOUR.powderBlue,
    flexDirection: 'row',
    paddingX: 2,
    alignItems: 'center',
    alignContent: 'center'
  },
  panelTitleContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  panelTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  accountInfoContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountIcon: {
    fontSize: 70
  },
  accountInfo: {
    margin: 2,
    justifyContent: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};
