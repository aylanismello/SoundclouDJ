import {connect} from 'react-redux'
import { receiveError } from '../actions/error_actions'
import Home from './home'

const mapStateToProps = state => {
	errors: state.errors
}

const mapDispatchToProps = dispatch => {
	receiveError: error => dispatch(receiveError(error))
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
