

document.addEventListener("DOMContentLoaded", function(){
    
    /** In Increasing and Decreasing a value from Input **/
    
    const run = (data) => {
        // Call after 500ms
        
        // Click Every 100ms
        data["ival"] = setInterval(() => {
            data["func"]();
        }, 100)
    };
    
    const stop = (data) => {
        clearInterval(data["ival"]);
    };
    
    
    // Main Input
    const input = document.querySelector("#num");
    
    // Init - Increase 
    const i_btn = HoldButton(document.querySelector("#i_num"));
    
    // Main function
    i_btn.onClick(() => {
        input.value = Number(input.value) + 1;
    });
    
    // Set what will happen if we hold the button
    i_btn.onHold(run, 500);
    
    // Set what will happen if we unhold the button
    i_btn.onUnHold(stop);
    
    
    // Init - Decrease
    const d_btn = HoldButton(document.querySelector("#d_num"));
    
    // our main function to call
    d_btn.onClick(() => {
        input.value = Number(input.value) - 1;
    })
    
    // Set what will happen if we hold the button
    
    d_btn.onHold(run, 500);
    
    // Set what will happen if we unhold the button
    d_btn.onUnHold(stop);
    
    
    /** With Modal // Pop-up action **/
    
    // Modal Container
    const m_modal = document.querySelector("#hold_modal");
    
    // Close on click
    document.querySelector("#hold_modal_close").addEventListener("click", x => m_modal.classList.add("hidden"));
    
    // Show Modal on Press and Hold Of a Button
    HoldButton(document.querySelector("#hold_button")).onHold((data) => {
        m_modal.classList.remove("hidden")
    });

});

/**
 * Written By Jovan De Guia
 * Project Name: Press and Hold For Web Buttons
 * Github: jxmked
 * */
