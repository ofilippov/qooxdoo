function QxImagePreloaderManager()
{
  if(QxImagePreloaderManager._instance) {
    return QxImagePreloaderManager._instance;
  };

  QxManager.call(this);
  
  QxImagePreloaderManager._instance = this;
};

QxImagePreloaderManager.extend(QxManager, "QxImagePreloaderManager");

proto.add = function(oObject) {
  this._objects[oObject.getUri()] = oObject;
};

proto.remove = function(oObject) {
  delete this._objects[oObject.getUri()];
};

proto.has = function(oUri) {
  return this._objects[String(oUri)] != null;
};

proto.get = function(oUri) {
  return this._objects[String(oUri)];
};