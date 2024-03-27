import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Modal, StyleSheet } from 'react-native';

class Loader extends Component {
   state = { animating: true };

   render() {
      const animating = this.state.animating
      return (
         <Modal
            transparent={true}
            animationType="fade"
            visible={animating}
            statusBarTranslucent={true}
            onRequestClose={() => {
               console.log("MODAL HAS CLOSED");
            }}
         >
            <View style={styles.centeredView}>
               <ActivityIndicator
                  animating={animating}
                  color={'red'}
                  size="large"
               />
            </View>
         </Modal>
      )
   }
}

export default Loader

const styles = StyleSheet.create({
   centeredView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
   container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.3,
      zIndex: 9,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
   },
})