/* ********************************************************************
   Class: QxClient
******************************************************************** */

function QxClient()
{
  if (QxClient._instance) {
    return QxClient._instance;
  };

  var n = navigator;
  var u = n.userAgent;
  var v = n.vendor;
  var p = n.product;
  var r = null;

  if (window.opera)
  {
    r="opera";
  }
  else if (typeof v=="string" && v=="KDE")
  {
    r="khtml";
  }
  else if (typeof p=="string" && p=="Gecko")
  {
    r="gecko";
  }
  else if (/msie/i.test(u))
  {
    r="mshtml";
  };

  this.engine = r;

  this.mshtml = r == "mshtml";
  this.gecko = r == "gecko";
  this.opera = r == "opera";
  this.khtml = r == "khtml";

  n=u=v=p=r=null;

  QxClient._instance = this;
};

QxClient.extend(Object, "QxClient");

proto.getEngine = function() {
  return this.engine;
};

proto.isMshtml = function() {
  return this.engine == "mshtml";
};

proto.isGecko = function() {
  return this.engine == "gecko";
};

proto.isOpera = function() {
  return this.engine == "opera";
};

proto.isKhtml = function() {
  return this.engine == "khtml";
};

proto.isNotMshtml = function() {
  return !this.isMshtml();
};

proto.isNotGecko = function() {
  return !this.isGecko();
};

proto.isNotOpera = function() {
  return !this.isMshtml();
};

proto.isNotKhtml = function() {
  return !this.isKhtml();
};

window.client = new QxClient;