import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import ManageSubscribersTable from '../../components/lists/ManageSubscribersTable';
import { deleteListSubscribers, getListSubscribers } from '../../actions/listActions';

function mapStateToProps(state) {
  return {
    subscribers: state.manageListSubscribers.subscribers,
    isGetting: state.manageListSubscribers.isGetting
  };
}

@connect(mapStateToProps, { deleteListSubscribers, getListSubscribers })
export default class ManageListSubscribers extends Component {

  static propTypes = {
    subscribers: PropTypes.array.isRequired,
    isGetting: PropTypes.bool.isRequired,
    deleteListSubscribers: PropTypes.func.isRequired,
    getListSubscribers: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getListSubscribers(this.props.params.listId, this.props.subscribers);
  }

 deleteRows(listSubscribers) { // listSubscriberIds [...Numbers(ids)]
    this.props.deleteListSubscribers(listSubscribers, this.props.subscribers);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="content-header">
          <h1>Manage List Subscribers: listname
            <small>alksjd</small>
          </h1>
        </div>

        <section className="content">
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">Subscribers</h3>
            </div>

            <div className="box-body">
              {!!this.props.subscribers.length &&
                <ManageSubscribersTable data={this.props.subscribers} deleteRows={this.deleteRows.bind(this)} />
              }
              {this.props.isGetting && <div className="overlay">
                <FontAwesome name="refresh" spin/>
              </div>}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
