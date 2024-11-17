import k from "../kaplayCtx"; // Import the Kaplay game context

// Function to create and return a Sonic character at a given position
export function makeSonic(pos) {
  // Create the Sonic entity with necessary properties
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }), // Add the sprite for Sonic with the "run" animation
    k.scale(4), // Scale Sonic by a factor of 4
    k.area(), // Enable collision detection
    k.anchor("center"), // Set the anchor point to the center of the sprite
    k.pos(pos), // Set the position to the given argument (pos)
    k.body({ jumpForce: 1700 }), // Add physics body with a jump force of 1700
    {
      // Add custom properties and methods for Sonic
      ringCollectUI: null, // Placeholder for UI text displaying collected rings

      // Method to set up controls (e.g., jump)
      setControls() {
        k.onButtonPress("jump", () => { // Listen for the "jump" button press
          if (this.isGrounded()) { // Check if Sonic is grounded
            this.play("jump"); // Play the jump animation
            this.jump(); // Make Sonic jump
            k.play("jump", { volume: 0.5 }); // Play jump sound at a volume of 0.5
          }
        });
      },

      // Method to set up events when Sonic interacts with the ground
      setEvents() {
        this.onGround(() => { // When Sonic touches the ground
          this.play("run"); // Play the running animation
        });
      },
    },
  ]);

  // Add UI element to show ring collection information
  sonic.ringCollectUI = sonic.add([
    k.text("", { font: "mania", size: 24 }), // Create a text UI element with a specific font and size
    k.color(255, 255, 0), // Set the text color to yellow (255, 255, 0)
    k.anchor("center"), // Set the text's anchor to the center
    k.pos(30, -10), // Position the text above Sonic by 10 units
  ]);

  // Return the Sonic entity
  return sonic;
}
