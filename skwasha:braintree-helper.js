Braintree = Npm.require('braintree');

BraintreeHelper = function() {
}

BraintreeHelper.getInstance = function() {
  if (BraintreeHelper._instance === undefined) {
    BraintreeHelper._instance = new BraintreeHelper();
  }
  return BraintreeHelper._instance;
}

BraintreeHelper.prototype.connect = function(options) {
  this.gateway = new Braintree.connect(options);
}

BraintreeHelper.prototype.getGateway = function() {
  return this.gateway;
}

BraintreeHelper.prototype.clientTokenGenerate = function(options, clientId) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.clientToken.generate, this.gateway.clientToken);
  if (clientId) {
    options.clientId = clientId;
  }
  var response = wrappedCall(options);
  return response.clientToken
}

BraintreeHelper.prototype.createSale = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.transaction.sale, this.gateway.transaction);
  return wrappedCall(options);
}

BraintreeHelper.prototype.createCustomer = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.customer.create, this.gateway.customer);
  var response = wrappedCall(options);
  return response
}

BraintreeHelper.prototype.createCreditCard = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.creditCard.create, this.gateway.creditCard);
  return wrappedCall(options);
}

BraintreeHelper.prototype.createSubscription = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.subscription.create, this.gateway.subscription);
  return wrappedCall(options);
}

BraintreeHelper.prototype.cancelSubscription = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.subscription.cancel, this.gateway.subscription);
  return wrappedCall(options);
}

BraintreeHelper.prototype.getCustomer = function(id) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.customer.find, this.gateway.customer);
  return wrappedCall(id);
}



//TODO: wrap up all the API calls
