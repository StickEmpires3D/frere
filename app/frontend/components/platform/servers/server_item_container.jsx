import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { receiveCurrentServerId } from '../../../actions/ui_actions';
import { fetchChannels } from '../../../actions/channel_actions';
import ServerItem from './server_item';

const msp = ({ session, entities: { users } }) => (
    
    {
        // currentUser: users[session.id]
        currentUser: users[session.currentUserInfo.user.id]
    }
);

const mdp = (dispatch) => (
    {
        receiveCurrentServerId: (serverId, alias) => dispatch(receiveCurrentServerId(serverId, alias)),
        fetchChannels: (serverId) => dispatch(fetchChannels(serverId))
    }
);

export default withRouter(connect(msp, mdp)(ServerItem));