var WebSocket = require('ws');
var apiIds = {
    'database_api': 0,
    'login_api': 1,
    'follow_api': 3,
    'network_broadcast_api': 4
};

var Steem = function (url) {
    this.url = 'wss://this.piston.rocks';
    this.ws = new WebSocket(this.url);
    this.id = 0;
    this.reqs = [];
    this.isOpen = false;
    this.ws.setMaxListeners(0);
    this.ws.addEventListener('close', function () {
    this.isOpen = false;
    }.bind(this));
};

Steem.prototype.open = function (callback) {
    if (!this.isOpen) {
        this.ws.addEventListener('open', function () {
            this.isOpen = true;
            callback();
        }.bind(this));
    } else {
        callback();
    }
};

Steem.prototype.iterate = function () {
    this.id++;
    var id = this.id;
    this.reqs.push(id);
    return id;
};

Steem.prototype.send = function (api, data, callback) {
    data.id = data.id || 0;
    data.params = data.params || [];
    this.open(function () {
        var call = {};
        call.id = data.id;
        call.method = 'call';
        call.params = [apiIds[api], data.method, data.params];
        this.ws.send(JSON.stringify(call));
    }.bind(this));

    this.ws.addEventListener('message', function (msg) {
        var data = JSON.parse(msg.data);
        var err = data.error || '';
        callback(err, data);
    }.bind(this));

    this.ws.addEventListener('error', function (error) {
        callback(error, null);
    });
};


// [database_api]

// Subscriptions

/* set_subscribe_callback */
Steem.prototype.setSubscribeCallback = function (cb, clearFilter, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'set_subscribe_callback',
        'params': [cb, clearFilter]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* set_pending_transaction_callback */
Steem.prototype.setPendingTransactionCallback = function (cb, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'set_pending_transaction_callback',
        'params': [cb]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* set_block_applied_callback */
Steem.prototype.setBlockAppliedCallback = function (cb, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'set_block_applied_callback',
        'params': [cb]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* cancel_all_subscriptions */
Steem.prototype.cancelAllSubscriptions = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'cancel_all_subscriptions'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// tags

/* get_trending_tags */
Steem.prototype.getTrendingTags = function (afterTag, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_trending_tags',
        'params': [afterTag, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_trending */
Steem.prototype.getDiscussionsByTrending = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_trending',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_created */
Steem.prototype.getDiscussionsByCreated = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_created',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_active */
Steem.prototype.getDiscussionsByActive = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_active',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_cashout */
Steem.prototype.getDiscussionsByCashout = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_cashout',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_payout */
Steem.prototype.getDiscussionsByPayout = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_payout',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_votes */
Steem.prototype.getDiscussionsByVotes = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_votes',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_children */
Steem.prototype.getDiscussionsByChildren = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_children',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_hot */
Steem.prototype.getDiscussionsByHot = function (query, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_hot',
        'params': [query]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Blocks and transactions

/* get_block_header */
Steem.prototype.getBlockHeader = function (blockNum, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_block_header',
        'params': [blockNum]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_block */
Steem.prototype.getBlock = function (blockNum, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_block',
        'params': [blockNum]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_state */
Steem.prototype.getState = function (path, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_state',
        'params': [path]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_trending_categories */
Steem.prototype.getTrendingCategories = function (after, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_trending_categories',
        'params': [after, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_best_categories */
Steem.prototype.getBestCategories = function (after, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_best_categories',
        'params': [after, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_active_categories */
Steem.prototype.getActiveCategories = function (after, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_active_categories',
        'params': [after, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_recent_categories */
Steem.prototype.getRecentCategories = function (after, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_recent_categories',
        'params': [after, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Globals

/* get_config */
Steem.prototype.getConfig = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_config',
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_dynamic_global_properties */
Steem.prototype.getDynamicGlobalProperties = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_dynamic_global_properties'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_chain_properties */
Steem.prototype.getChainProperties = function (after, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_chain_properties'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_feed_history */
Steem.prototype.getFeedHistory = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_feed_history'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_current_median_history_price */
Steem.prototype.getCurrentMedianHistoryPrice = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_current_median_history_price'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_witness_schedule */
Steem.prototype.getWitnessSchedule = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_recent_categories',
        'params': [after, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_hardfork_version */
Steem.prototype.getHardforkVersion = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_hardfork_version'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_next_scheduled_hardfork */
Steem.prototype.getNextScheduledHardfork = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_next_scheduled_hardfork'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Keys

/* get_key_references */
Steem.prototype.getKeyReferences = function (key, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_key_references',
        'params': [key]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Accounts

/* get_accounts */
Steem.prototype.getAccounts = function (names, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_accounts',
        'params': [names]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_account_references */
Steem.prototype.getAccountReferences = function (accountId, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_account_references',
        'params': [accountId]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* lookup_account_names */
Steem.prototype.lookupAccountNames = function (accountNames, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'lookup_account_names',
        'params': [accountNames]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* lookup_accounts */
Steem.prototype.lookupAccounts = function (lowerBoundName, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'lookup_accounts',
        'params': [lowerBoundName, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_account_count */
Steem.prototype.getAccountCount = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_account_count'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_conversion_requests */
Steem.prototype.getConversionRequests = function (accountName, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_conversion_requests',
        'params': [accountName]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_account_history */
Steem.prototype.getAccountHistory = function (account, from, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_account_history',
        'params': [account, from, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_owner_history */
Steem.prototype.getOwnerHistory = function (account, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_owner_history',
        'params': [account]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_recovery_request */
Steem.prototype.getRecoveryRequest = function (account, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_recovery_request',
        'params': [account]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Market

/* get_order_book */
Steem.prototype.getOrderBook = function (limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'getOrderBook',
        'params': [limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_open_orders */
Steem.prototype.getOpenOrders = function (owner, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_open_orders',
        'params': [owner]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_liquidity_queue */
Steem.prototype.getLiquidityQueue = function (startAccount, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_liquidity_queue',
        'params': [startAccount, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Authority / validation

/* get_transaction_hex */
Steem.prototype.getTransactionHex = function (trx, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_transaction_hex',
        'params': [trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_transaction */
Steem.prototype.getTransaction = function (trxId, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_transaction',
        'params': [trxId]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_required_signatures */
Steem.prototype.getRequiredSignatures = function (trx, availableKeys, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_required_signatures',
        'params': [trx, availableKeys]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_potential_signatures */
Steem.prototype.getPotentialSignatures = function (trx, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_potential_signatures',
        'params': [trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* verify_authority */
Steem.prototype.verifyAuthority = function (trx, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'verify_authority',
        'params': [trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* verify_account_authority */
Steem.prototype.verifyAccountAuthority = function (nameOrId, signers, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'verify_account_authority',
        'params': [nameOrId, signers]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// votes

/* get_active_votes */
Steem.prototype.getActiveVotes = function (author, permlink, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_active_votes',
        'params': [author, permlink]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_account_votes */
Steem.prototype.getAccountVotes = function (voter, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_account_votes',
        'params': [voter]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// content

/* get_content */
Steem.prototype.getContent = function (author, permlink, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_content',
        'params': [author, permlink]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_content_replies */
Steem.prototype.getContentReplies = function (parent, parentPermlink, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_content_replies',
        'params': [parent, parentPermlink]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_discussions_by_author_before_date */
Steem.prototype.getDiscussionsByAuthorBeforeDate = function (author, startPermlink, beforeDate, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_discussions_by_author_before_date',
        'params': [author, startPermlink, beforeDate, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_replies_by_last_update */
Steem.prototype.getRepliesByLastUpdate = function (startAuthor, startPermlink, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_replies_by_last_update',
        'params': [startAuthor, startPermlink, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// Witnesses

/* get_witnesses */
Steem.prototype.getWitnesses = function (witnessIds, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_witnesses',
        'params': [witnessIds]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_witness_by_account */
Steem.prototype.getWitnessByAccount = function (accountName, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_witness_by_account',
        'params': [accountName]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_witnesses_by_vote */
Steem.prototype.getWitnessesByVote = function (from, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_witnesses_by_vote',
        'params': [from, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* lookup_witness_accounts */
Steem.prototype.lookupWitnessAccounts = function (lowerBoundName, limit, callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'lookup_witness_accounts',
        'params': [lowerBoundName, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_witness_count */
Steem.prototype.getWitnessCount = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_witness_count'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_active_witnesses */
Steem.prototype.getActiveWitnesses = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_active_witnesses'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_miner_queue */
Steem.prototype.getMinerQueue = function (callback) {
    var iterator = this.iterate();
    this.send('database_api', {
        'id': iterator,
        'method': 'get_miner_queue'
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// [login_api]

/* login */
Steem.prototype.login = function (username, password, callback) {
    var iterator = this.iterate();
    this.send('login_api', {
        'id': iterator,
        'method': 'login',
        'params': [username, password]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data);
    });
};

/* get_api_by_name */
Steem.prototype.getApiByName = function (apiName, callback) {
    var iterator = this.iterate();
    this.send('login_api', {
        'id': iterator,
        'method': 'get_api_by_name',
        'params': [apiName]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// [follow_api]

/* get_followers */
Steem.prototype.getFollowers = function (following, startFollower, limit, callback) {
    var iterator = this.iterate();
    this.send('follow_api', {
        'id': iterator,
        'method': 'get_followers',
        'params': [following, startFollower, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* get_following */
Steem.prototype.getFollowing = function (follower, startFollowing, limit, callback) {
    var iterator = this.iterate();
    this.send('follow_api', {
        'id': iterator,
        'method': 'get_following',
        'params': [follower, startFollowing, limit]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// [network_broadcast_api]

/* broadcast_transaction */
Steem.prototype.broadcastTransaction = function (trx, callback) {
    var iterator = this.iterate();
    this.send('network_broadcast_api', {
        'id': iterator,
        'method': 'broadcast_transaction',
        'params': [trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* broadcast_transaction_synchronous */
Steem.prototype.broadcastTransactionSynchronous = function (trx, callback) {
    var iterator = this.iterate();
    this.send('network_broadcast_api', {
        'id': iterator,
        'method': 'broadcast_transaction_synchronous',
        'params': [trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* broadcast_block */
Steem.prototype.broadcastBlock = function (b, callback) {
    var iterator = this.iterate();
    this.send('network_broadcast_api', {
        'id': iterator,
        'method': 'broadcast_block',
        'params': [b]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};

/* broadcast_transaction_with_callback */
Steem.prototype.broadcastTransactionWithCallback = function (confirmationCallback, trx, callback) {
    var iterator = this.iterate();
    this.send('network_broadcast_api', {
        'id': iterator,
        'method': 'broadcast_transaction_with_callback',
        'params': [confirmationCallback, trx]
    }, function (err, data) {
        if (iterator == data.id) callback(err, data.result);
    });
};


// [Stream]

Steem.prototype.streamBlockNumber = function (callback) {
    var current = '';
    var self = this;
    setInterval(function () {
        self.getDynamicGlobalProperties(function (err, result) {
            var blockId = result.head_block_number;
            if (blockId != current) {
                current = blockId;
                callback(null, current);
            }
        });
    }, 200);
};

Steem.prototype.streamBlock = function (callback) {
    var current = '';
    var last = '';
    var self = this;
    this.streamBlockNumber(function (err, id) {
        current = id;
        if (current != last) {
            last = current;
            self.getBlock(current, function (err, result) {
                callback(null, result);
            });
        }
    });
};

Steem.prototype.streamTransactions = function (callback) {
    this.streamBlock(function (err, result) {
        if (!!result) {
            result.transactions.forEach(function (transaction) {
                callback(null, transaction);
            });
        }
    })
};

Steem.prototype.streamOperations = function (callback) {
    this.streamBlock(function (err, result) {
        if (!!result) {
            result.transactions.forEach(function (transaction) {
                transaction.operations.forEach(function (operation) {
                    callback(null, operation);
                });
            });
        }
    })
};


module.exports = Steem;
