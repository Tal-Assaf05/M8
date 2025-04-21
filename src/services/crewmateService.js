import { supabase } from '../config/supabase';

export const crewmateService = {
  async getCrewmates() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createCrewmate(crewmate) {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCrewmate(id, crewmate) {
    const { data, error } = await supabase
      .from('crewmates')
      .update({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteCrewmate(id) {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}; 