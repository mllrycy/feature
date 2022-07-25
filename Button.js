/**
 * Project name: Project Name: Press and Hold For Web Buttons
 * 
 * */
 
function HoldButton(element) {
    /**
     * Click and Hold or Tap and hold a button to initiate extra feature.
     * */
     
    if(! element instanceof Object) {
        throw new Error("HoldButton requires DOM object");
    }
    
    const has = {
        "onhold" : false,
        "onunhold" : false
    };
    
    const callbacks = {
        "hold" : function(){},
        "unhold" : function(){},
        "main" : function(){}
    };
    
    let ival; // Store setTimeout event data
    let rpTime; // Initiate extra feature after a given time in millisecond
    
    // Save some data that are related to this function
    const userdata = {};
    
    const start = (e) => {
        has.onhold = true;
                
        if(e.cancelable){
            e.preventDefault();
        }
        
        ival = setTimeout(() => {
            callbacks["hold"](userdata);
        }, rpTime);
    }
    
    const end = (e) => {
        if(e.cancelable){
            e.preventDefault();
        }
        
        try {
            if(e.type != "mouseleave"){
                // Main Function
                userdata["click"](userdata);
            }
             
            // Unhold Function
            callbacks["unhold"](userdata);
        } catch(TypeError){}
        
        /** Stop or Prevent Timeout to initiate **/
         clearTimeout(ival);
         
        has.onhold = false;
    }
    
    return {
        "onClick" : (callback) => {
            if(! (callback && {}.toString.call(callback) === '[object Function]')){
                throw new Error("HoldButton.onClick requires a function");
            }
            
            userdata["click"] = callback;
            userdata["func"] = callback;
            userdata["function"] = callback;
        },
        
        "onHold" : (callback, responseTime=1000) => {
            rpTime = responseTime;
            
            if(has.onhold) {
                throw new Error("HoldButton.onHold can be call only once.");
            }
            
            callbacks["hold"] = callback;
            
            if('ontouchstart' in element && 'ontouchend' in element) {
                // For Mobile Devices
                element.addEventListener("touchend", end, false);
                element.addEventListener("touchstart", start, false);
            } else if('onmousedown' in element && 'onmouseup' in element) {
                // For Desktop type devices
                
                /**
                 * My best way of solving...mouseup did not fire if
                 * the cursor is out of element.
                 * */
                element.addEventListener('mouseleave', end, false);
                element.addEventListener('mouseup', end, false);
                element.addEventListener('mousedown', start, false);
            } else {
                // I don't know what to put here. Hahaha
            }
        },
        
        "onUnHold" : (callback) => {
            if(has.onUnHold) {
                throw new Error("HoldButton.onUnHold can be call only once.");
            }
            
            has.onUnHold = true;
            
            callbacks["unhold"] = callback;
        }
    }
}

/**
 * Written By Jovan De Guia
 * Project Name: Press and Hold For Web Buttons
 * Github: jxmked
 * */
