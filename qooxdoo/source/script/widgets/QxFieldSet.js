function QxFieldSet(vLegend)
{
  QxWidget.call(this);
  
  if (isValid(vLegend)) {
    this.setLegend(vLegend);
  };
  
  this.setMinWidth(100);
  this.setMinHeight(50);
  
  this._dim = {};
};

QxFieldSet.extend(QxWidget, "QxFieldSet");

QxFieldSet.addProperty({ name : "legend", type : String });

proto._modifyElement = function(propValue, propOldValue, propName, uniqModIds)
{
  if (propValue)
  {
    if (!this._frame)
    {
      this._frame = QxFieldSet._element.cloneNode(true);
      this._legend = this._frame.firstChild;
      this._content = this._frame.lastChild;
    };
    
    propValue.appendChild(this._frame);
  }
  else if (propOldValue && this._frame)
  {
    propOldValue.removeChild(this._frame);
  }; 
  
  QxWidget.prototype._modifyElement.call(this, propValue, propOldValue, propName, uniqModIds);
  
  return true;
};

proto._beforeShow = function()
{
  this._renderLegend();
  this._renderWidth();
  this._renderHeight();    
};

if ((new QxClient).isGecko())
{
  proto._renderLegend = function() 
  {
    if (!this.isCreated()) {
      return;
    };
    
    var oldWidth1 = this.getElement().style.width;
    var oldWidth2 = this._frame.style.width;
    var newWidth;
    
    this.getElement().style.width = this._frame.style.width = "10000px";
    
    this._legend.style.width = "";

    var l = this.getLegend();
    if (isValid(l)) 
    {
      this._legend.firstChild.nodeValue = l;
      this._legend.style.display = "block";

      newWidth = this._legend.scrollWidth;
    }
    else
    {
      this._legend.style.display = "none";

      newWidth = 0;
    };    
    
    this.getElement().style.width = oldWidth1;
    this._frame.style.width = oldWidth2;
    
    // needed, otherwise padding doesn't work
    this._legend.style.width = newWidth + "px";
    
    this.setMinWidth(newWidth + QxDOM.getComputedMarginLeft(this._legend) + QxDOM.getComputedMarginRight(this._legend));    
  };  
}
else
{
  proto._renderLegend = function() 
  {
    if (!this.isCreated()) {
      return;
    };
    
    var l = this.getLegend();
    if (isValid(l)) 
    {
      this._legend.firstChild.nodeValue = l;
      this._legend.style.display = "block";
    }
    else
    {
      this._legend.style.display = "none";
    };
    
    this.setMinWidth(this._legend.scrollWidth + QxDOM.getComputedMarginLeft(this._legend) + QxDOM.getComputedMarginRight(this._legend));
  };
};


proto._modifyLegend = function(propValue, propOldValue, propName, uniqModIds)
{
  this._renderLegend();
  return true;
};

proto._getParentNodeForChild = function() {
  return this._content;  
};

proto._renderWidth = function(size)
{
  if (!this.isCreated()) {
    return true;
  };
  
  var wFrame = Math.max(0, this.getElement().offsetWidth - QxDOM.getComputedMarginLeft(this._frame) - QxDOM.getComputedMarginRight(this._frame));
  var wContent = wFrame > 0 ? Math.max(0, wFrame - QxDOM.getComputedInsetLeft(this._frame) - QxDOM.getComputedInsetRight(this._frame) - QxDOM.getComputedMarginLeft(this._content) - QxDOM.getComputedMarginRight(this._content)) : 0;
  
  this._frame.style.width = wFrame + "px";
  this._content.style.width = wContent + "px";
  
  return true;
};

proto._renderHeight = function(size)
{
  if (!this.isCreated()) {
    return true;
  };
  
  var hFrame = Math.max(0, this.getElement().offsetHeight - QxDOM.getComputedMarginTop(this._frame) - QxDOM.getComputedMarginBottom(this._frame));
  var hContent = hFrame > 0 ? Math.max(0, hFrame - QxDOM.getComputedInsetTop(this._frame) - QxDOM.getComputedInsetBottom(this._frame) - QxDOM.getComputedMarginTop(this._content) - QxDOM.getComputedMarginBottom(this._content)) : 0;
  
  this._frame.style.height = hFrame + "px";
  this._content.style.height = hContent + "px";
  
  return true;
};

proto.getComputedInsetLeft = function() {
  return QxDOM.getComputedMarginLeft(this._frame) + QxDOM.getComputedInsetLeft(this._frame) + QxDOM.getComputedMarginLeft(this._content);
};

proto.getComputedInsetRight = function() {
  return QxDOM.getComputedMarginRight(this._frame) + QxDOM.getComputedInsetRight(this._frame) + QxDOM.getComputedMarginRight(this._content);
};

proto.getComputedInsetTop = function() {
  return QxDOM.getComputedMarginTop(this._frame) + QxDOM.getComputedInsetTop(this._frame) + QxDOM.getComputedMarginTop(this._content);
};

proto.getComputedInsetBottom = function() {
  return QxDOM.getComputedMarginBottom(this._frame) + QxDOM.getComputedInsetBottom(this._frame) + QxDOM.getComputedMarginBottom(this._content);
};

proto.getComputedAreaWidth = function() {
  return this.getElement().offsetWidth - this.getComputedInsetLeft() - this.getComputedInsetRight();
};

proto.getComputedAreaHeight = function() {
  return this.getElement().offsetHeight - this.getComputedInsetTop() - this.getComputedInsetBottom();
};

proto.getComputedInnerWidth = function() {
  return this.getElement().offsetWidth - this.getComputedInsetLeft() - this.getComputedInsetRight() - this.getComputedPaddingLeft() - this.getComputedPaddingRight();
};

proto.getComputedInnerHeight = function() {
  return this.getElement().offsetHeight - this.getComputedInsetTop() - this.getComputedInsetBottom() - this.getComputedPaddingTop() - this.getComputedPaddingBottom();
};

proto._applyXSize = function(size)
{
  QxWidget.prototype._applyXSize.call(this, size);
  return this._renderWidth();
};

proto._applyYSize = function(size)
{
  QxWidget.prototype._applyYSize.call(this, size);
  return this._renderHeight();
};


/*
  ################################################################################
    Create Clone-able node structure
  ################################################################################
*/

QxFieldSet.init = function()
{
  var frame = QxFieldSet._element = document.createElement("div");
  
  var legend = document.createElement("div");
  var legendText = document.createTextNode("-");
  
  var content = document.createElement("div");
  
  frame.className = "QxFieldSetFrame";
  legend.className = "QxFieldSetLegend";
  content.className = "QxFieldSetContent";
  
  legend.appendChild(legendText);
  frame.appendChild(legend);
  frame.appendChild(content);
};

QxFieldSet.init();
